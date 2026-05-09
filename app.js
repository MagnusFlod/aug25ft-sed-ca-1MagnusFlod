require('dotenv').config();
var db = require('./models');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var participantRouter = require('./routes/participant');

var app = express();

db.sequelize.sync({ force: false })
.then(() => console.log('Database is connected.'))
.catch(err => console.log('DB error', err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/participant', participantRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error in json-format
  res.status(err.status || 500).json
  ({
    message: err.message
  });
});

module.exports = app;
