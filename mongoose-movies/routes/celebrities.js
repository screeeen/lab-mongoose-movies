var express = require('express');
var router = express.Router();
const Celebrity = require('./../models/Celebrity');

// GET '/celebrities'
router.get('/', (req, res, next) => {
  Celebrity.find({})
    .then(allTheCelebritiesFromDB => {
      // console.log('anything?', allTheCelebritiesFromDB);
      res.render('celebrities', { allTheCelebritiesFromDB });
    })
    .catch(err => console.log(err));
});

// GET '/celebrities query'
router.get('/celebrities/:id', (req, res, next) => {
  const _id = req.params.id;

  console.log('id: ', _id);
  Celebrity.findById(_id)
    .then(celebrity => res.render('show', { celebrity }))
    .catch(err => console.log(err));
  // If there's an error, call the route's next function and return the error. //HOW??
});

// GET ./celebrities/new
router.get('/new', function(req, res, next) {
  res.render('new');
});

//Post '/celebrities/new'
router.post('/new', function(req, res, next) {
  console.log('req.body', req.body); // my notes: because is post, stores into body. Post has body, GET query or params
  // my notes: fetching the var or deconstruction
  // const title = req.body.title;
  //or deconstruction
  const { name, occupation, catchPhrase } = req.body; //deconstruct from form action, body etc

  const newCeleb = new Celebrity({ name, occupation, catchPhrase }); //instantiate the object
  newCeleb
    .save() // save it into db, this format is a thenable.
    .then(celebrity => res.redirect('/'))
    .catch(err => console.log(err));
});

//Post '/celebrities/new'
router.post('/:id/delete', function(req, res, next) {
  console.log('req.body', req.body);
  const { _id } = req.body;
  Celebrity.findByIdAndRemove(_id)
    .remove(_id)
    .then(data => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
