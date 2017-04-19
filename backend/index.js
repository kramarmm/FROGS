var express = require('express');
var errorHandler = require('errorhandler');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var config = require("./config");
var HttpError = require('./error').HttpError;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 
app.use(express.static(path.join(__dirname, '../public')));

// var db = require("./createDb.js");
app.use(require('./middleware/sendHttpError'));

require('./routes')(app);

app.use((err, req, res, next) => {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      errorHandler()(err, req, res, next);
    } else {
      console.log(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

app.listen(config.get("port"), () => console.log('Hello friend :)'));