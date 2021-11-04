const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcrypt');

const User   = db.User;

const userController = {
    ////// Proceso de registro y logueo
    add: (req, res) => {
        res.render('register.ejs')
    },
    create: async (req, res) => {
        // validacion backend middleware
        const resultValidation = validationResult(req);
        console.log("Paso de Register");
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        // Verificar si un correo ya esta registrado en la base de datos
        let userInDB = await User.findOne({
            where: { email: req.body.email }
        });
        // console.log(userInDB);
        if (userInDB) {
            console.log(userInDB);
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Intenta de nuevo'
                    }
                },
                oldData: req.body
            });
        }else{

            let password = bcryptjs.hashSync(req.body.password, 10);
            const userInfo = {
                name: req.body.name,
                password: password,
                email: req.body.email
            }
            console.log(userInfo)
            await User.create(userInfo)
            res.redirect('/')
        }
    },
    login: (req, res) => {
        res.render('login.ejs')
    },
    loginProcess: (req, res) => {
        User.findOne({
              where:{
                  email: req.body.email 
              }
            }).then((userToLogin) => { 
                console.log(userToLogin);
                if (userToLogin){
                    console.log('Si paso el usuario a loguearse'+userToLogin);
                    console.log(userToLogin.password);
                    let isOkThepassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    console.log('campareSync ' + isOkThepassword);
                    if(isOkThepassword) {
                      delete userToLogin.password;
                      req.session.userLogged = userToLogin;
                      if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, {maxAge: (1000 *60)*2});
                      }
                      return res.redirect('/users/userProfile');
                      //return res.send('Ok puedes ingresar')
                    }
                    return res.render('login',{
                      errors: {
                        email: {
                          msg: 'Las credenciales son inválidas'
                        }
                      }
                    });
                }
                  return res.render('login',
                  console.log('no paso el usuario porque no se encontro el email del usuario'),
                  {  
                    errors: {
                      email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                      }
                    }
                  });
            })
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    },
}

module.exports = userController;

