module.exports = function (app) {

var express = require('express');
var path = require('path');
var HttpError = require('../error').HttpError;

var fs = require('fs');
var login = require("../users.js");


app.post('/login', function(req, res, next) {
    console.log(req.body);
    ( login.checkUserAuth(req.body.login, req.body.password) ) ? next(true) : res.sendStatus(403);
    res.end();
    
});

var User = require('../models/user').User;
app.get("/users", (req,res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);
        res.json(users);
    })
});

app.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) {
            next(new HttpError(404));
        } 
        res.json(user); 
    });
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', "game.html"));
});
}