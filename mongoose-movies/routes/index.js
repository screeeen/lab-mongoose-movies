var express = require('express');
var router = express.Router();

const celebritiesRouter = require('./celebrities');
const moviesRouter = require('./movies');
const authRouter = require('./auth');

// * '/celebrities'
router.use('/celebrities', celebritiesRouter);
// * '/movies'
router.use('/movies', moviesRouter);
// * '/auth'
router.use('/auth', authRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Celebrities & Movies' });
});

module.exports = router;
