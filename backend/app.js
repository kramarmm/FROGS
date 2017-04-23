var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var log = require("./lib/log")(module);
var config = require("./config");
var mongoose = require('./lib/mongoose');
var favicon = require('serve-favicon');
var HttpError = require('./error').HttpError;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

var MongoStore = require("connect-mongo")(session);

app.use(session({
  secret: config.get("session:secret"),
  resave: true,
  saveUninitialized: true,
  key: config.get("session:key"),
  cookie: config.get("session:cookie"),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 

app.use(require('./middleware/sendHttpError'));
app.use(require("./middleware/loadUser.js"));

require('./routes')(app);

app.use(express.static(path.join(__dirname, '../public')));

// ERRORS
app.use(function(err, req, res, next) {

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
  }
});

app.listen(config.get("port"), () => log.info("\nServer is on! \n \\ \/\n\ . \.\n  O"));