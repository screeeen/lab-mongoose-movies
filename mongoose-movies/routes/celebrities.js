var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Celebrity = require('./../models/Celebrity');


//---------------------SHOW--------------------
// GET '/celebrities'
router.get('/', (req, res, next) => {
  Celebrity.find({})
    .then(allTheCelebritiesFromDB => {
      res.render('celebrities', { allTheCelebritiesFromDB });
    })
    .catch(err => console.log(err));
});

// GET '/celebrities query'
router.get('/show/:id', (req, res, next) => {
  const _id = req.params.id;
  Celebrity.findById(_id)
    .then(celebrity => res.render('celebrities/show', { celebrity }))
    .catch(err => console.log(err));
  // If there's an error, call the route's next function and return the error. //HOW??
});

//---------------------CREATE--------------------
// GET ./celebrities/new
router.get('/new', function(req, res, next) {
  res.render('celebrities/new');
});

router.post('/new', function(req, res, next) {
  const { name, occupation, catchPhrase } = req.body; //deconstruct from form action, body etc

  const newCeleb = new Celebrity({ name, occupation, catchPhrase }); //instantiate the object
  newCeleb
    .save() // save it into db, this format is a thenable.
    .then(celebrity => res.redirect('/celebrities'))
    .catch(err => console.log(err));
});

//---------------------DELETE--------------------
router.post('/:id/delete', function(req, res, next) {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(data => res.redirect('/celebrities'))
    .catch(err => console.log(err));
});
//---------------------UPDATE--------------------

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params; //deconstruction
  Celebrity.findOne({ id }) // pass into object, always {} promise
    .then(celeb => res.render('celebrities/edit', { celeb })
    )
    .catch(err => console.log(err));
});

//post 'edit'
router.post('/:id/edit', (req, res, next) => {
  const { id, name, occupation, catchPhrase } = req.body;
  Celebrity.findOneAndUpdate({ id }, { $set: { name, occupation, catchPhrase } })
    .then(data => res.redirect('/celebrities'))
    .catch(err => console.log(err));
});



module.exports = router;
