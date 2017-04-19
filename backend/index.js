var express = require('express'),
    app = express();

var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var config = require("./config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 
app.use(express.static(path.join(__dirname, '../public')));

// var db = require("./createDb.js");

require('./routes')(app);

app.listen(config.get("port"), () => console.log('Hello friend :)'));