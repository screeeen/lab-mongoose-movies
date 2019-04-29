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

// GET '/celebrities'
router.get('/celebrities/:id', (req, res, next) => {
  const  _id  = req.params.id;

  console.log('id: ',_id);
  Celebrity.findById(_id)
    .then(celebrity => res.render('show', { celebrity }))
    .catch(err => console.log(err));
  // If there's an error, call the route's next function and return the error. //HOW??
});

module.exports = router;
