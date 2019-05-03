'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const config =require('./config/config');


// Session and Passport modules
const session = require("express-session");
const passport = require("./config/passport-config");  // passport module setup and initial load
const passportStrategySetup = require('./config/passport-local-strategy');

const router = require('./routes/index');
// const celebritiesRouter = require('./routes/celebrities');

mongoose.connect(`mongodb://localhost/celebrities`, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}));

// PASSPORT LINES MUST BE BELOW SESSION

//	Auth Setup - how is the user being authenticated during login
passport.use(passportStrategySetup);

// Creates Passport's methods and properties on `req` for use in out routes
app.use(passport.initialize());

// Invokes / Sets Passport to manage user session
app.use(passport.session());



app.use('/', router);
// app.use('/celebrities', celebritiesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
