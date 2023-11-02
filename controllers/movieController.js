const Movie = require('../models/movie');

// get movie index
const movie_index = (req, res) => {
    Movie.find().sort({ title: 1 })
        .then((result) => {
            res.render('index', { title: 'Movie Database',  movies: result })
        })
        .catch((err) => console.log(err));
}

// get movie create
const movie_create_get = (req, res) => {
    res.render('create', { title: 'Movie Database'});
}

// post movie to db
const movie_create_post = (req, res) => {
    const movie = new Movie(req.body);

    movie.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => console.log(err))
}

module.exports = { movie_index, movie_create_get, movie_create_post }