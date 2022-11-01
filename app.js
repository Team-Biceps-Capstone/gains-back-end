var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var app = express();

require('dotenv').config();



  // Set routers
  var indexRouter = require('./routes/index');
  var challengeRouter = require('./routes/challenge')
  var userRouter = require('./routes/user')
  
  

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // use cors
  const cors = require("cors");
  app.use(
    cors({
      origin: "*"
    }))

  // use routes
  app.use('/', indexRouter);
  app.use('/challenge', challengeRouter);
  app.use('/api/user', userRouter)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// connect to db //Adrian's mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT2, () => {
      console.log('connected to db & listening on port', process.env.PORT2)
    })
  })
  .catch((error) => {
    console.log(error)
  })


module.exports = app;