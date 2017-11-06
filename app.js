var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var config = require('./config/database');
var passport = require('passport')
var flash = require('connect-flash');
var session = require('express-session');
var messages = require('express-messages');


var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session middleware
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  // cookie: {secure: true},
}));

// express message middleware
app.use(flash());
app.use((req, res ,next) => {
  res.locals.messages = messages(req, res);
  next();
})

// validationErrors MESS WITH LATER
app.use(expressValidator())

// passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// global user
app.get('*', (req ,res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

mongoose.connect(config.database);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
