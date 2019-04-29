var express = require('express');
var router = express.Router();
const Celebrity = require('./../models/Celebrity');

// GET '/celebrities'
router.get('/', (req, res, next) => {
  // const thing 
  
  Celebrity.find({})
  .then(allTheCelebritiesFromDB =>{
    
      console.log('anything?', allTheCelebritiesFromDB);
      res.render('celebrities', { allTheCelebritiesFromDB })
    }
    )
    .catch(err => console.log(err));
});

module.exports = router;
