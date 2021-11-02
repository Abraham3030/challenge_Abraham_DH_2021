/**Configuración del controlador para index */

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const controller = {
    index: (req, res) => {
        Movies.findAll({
            include:[{
                association: 'genero',
                required: true
            }]
        })
            .then(movies => {
                res.render('index.ejs', {movies})
            })
    },
    detail: (req, res) => {
        Movies.findByPk(req.params.id, 
            {
                include:[{
                    association: 'genero',
                    required: true
                }]
            })
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },

}

module.exports = controller;

