var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Movie = require('./../models/Movie');

//---------------------SHOW--------------------
// GET '/celebrities'
router.get('/', (req, res, next) => {
  Movie.find({})
    .then(allTheMovies => {
      res.render('movies', { allTheMovies: allTheMovies });
    })
    .catch(err => console.log(err));
});

// GET '/celebrities query'
router.get('/show/:id', (req, res, next) => {
  const _id = req.params.id;
  Movie.findById(_id)
    .then(movie => res.render('movies/show', { movie }))
    .catch(err => console.log(err));
  // If there's an error, call the route's next function and return the error. //HOW??
});

//---------------------CREATE--------------------
// GET ./celebrities/new
router.get('/new', function(req, res, next) {
  res.render('movies/new');
});

router.post('/new', function(req, res, next) {
  const { title,genre,plot } = req.body; //deconstruct from form action, body etc

  const newMovie = new Movie({ title,genre,plot }); //instantiate the object
  newMovie
    .save() // save it into db, this format is a thenable.
    .then(celebrity => res.redirect('/movies'))
    .catch(err => console.log(err));
});

//---------------------DELETE--------------------
router.post('/:id/delete', function(req, res, next) {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(data => res.redirect('/movies'))
    .catch(err => console.log(err));
});
//---------------------UPDATE--------------------

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params; //deconstruction
  Movie.findOne({ id }) // pass into object, always {} promise
    .then(movie => res.render('movies/edit', { movie })
    )
    .catch(err => console.log(err));
});

//post 'edit'
router.post('/:id/edit', (req, res, next) => {
  const { id, title, genre, plot } = req.body;
  Movie.findOneAndUpdate({ id }, { $set: { title, genre, plot } })
    .then(data => res.redirect('/movies'))
    .catch(err => console.log(err));
});


module.exports = router;

