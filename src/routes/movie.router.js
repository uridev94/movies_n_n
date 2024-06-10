const { getAll, create, getOne, remove, update, setActors, setDirectors, setGenres } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/actors')
    .post(setActors)

routerMovie.route('/:id/directors')
    .post(setDirectors)  
    
routerMovie.route('/:id/genres')
    .post(setGenres)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;