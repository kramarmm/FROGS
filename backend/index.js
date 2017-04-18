var express = require('express'),
    app = express();

var path = require('path'),
    fs = require('fs');

var favicon = require('serve-favicon');

var config = require("./config");

var bodyParser = require('body-parser');
var login = require("./users.js");

// var usersArray = [];
// var users = require('./my_users.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 
app.use('/', express.static(path.join(__dirname, '../public')));

var db = require("./createDb.js");

app.post('/login', function(req, res) {
    // usersArray.push(JSON.stringify(req.body));    
    // console.log(usersArray);

    // fs.writeFile('my_users.json', "[" + usersArray + "]", function (err) {
    //     if (err) return console.log(err);
    // });

    ( login.checkUserAuth(req.body.login, req.body.password) ) ? fs.readdir(path.join(__dirname, '../public'), (err) => console.log(err)) : res.sendStatus(403);
    
    // return usersArray;

});


app.listen(config.get("port"), () => console.log('Privet ot servera'));

