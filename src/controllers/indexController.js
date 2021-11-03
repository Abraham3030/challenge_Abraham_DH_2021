/**Configuración del controlador para index */

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const indexController = {
    index: (req, res) => {
        Movies.findAll()
            .then(movies => {
                res.render('index.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include:[
                {
                    association: 'genero',
                    required: true
                },
                {
                    association: 'actores'
                }
        ]
        })
        .then(movie => {
            res.render('moviesDetail.ejs', {movie});
        });
    },
    //Metodos para las rutas del CRUD
    add: function (req, res, next) {
        Genres.findAll()
        .then(genres => {
            res.render('moviesAdd', { allGenres: genres });
        })
        .catch(err => {
            console.error(err)
            next(err)
        })
    },
    create: function (req,res) {
        const movieInfo = req.body
        console.log(movieInfo)
        Movies.create(movieInfo)
            .then(movieCreated => {
                console.log(movieCreated);
                res.redirect('/')
            })
    },
    edit: async function(req,res) {
        const movieId = req.params.id
        const movie =  await Movies.findByPk(movieId, {
            include: [{
                association: 'genero'
            }]
        })
        const allGenres = await Genres.findAll()
        res.render('moviesEdit', { Movie: movie, allGenres })
    },
    update: async function (req,res) {
        const movieId = req.params.id
        const movieInfo = req.body
        console.log(movieInfo)
        const movieActualizado = await Movies.update(movieInfo, {
            where: {
                id: movieId
            }
        })
        res.redirect('/')
    },
    destroy: async function (req, res) {
        await db.Movie.destroy({
            where: {id: req.params.id}
        })
        res.redirect('/');
      }
}

module.exports = indexController;

