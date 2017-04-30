var path = require('path');
var outcome = require('./outcome.json');
var checkWin = require('../middleware/checkWin');
var User = require('../models/user').User;

// GET GAME PAGE
exports.get = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', "game.html"));    
}

// POST USER CHOICE AND CHECK IT FOR WIN
exports.post = (req, res, next) => {
    User.findById(req.session.user, (err, user) => {
        if (err) return next(err);          

        if (checkWin(req.body.enemy, req.body.fateObj)) {
            User.update({ _id: user._id }, {$push: { passedIslands: req.body.enemy }}, err => err);
            User.update({ _id: user._id }, {$set: { points: ++user.points }}, err => err); 
        } else {
            User.update({ _id: user._id }, {$set: { points: --user.points }}, err => err);
        }

        res.set("win", checkWin(req.body.enemy, req.body.fateObj));
        res.set("points", user.points);
        res.send(outcome[req.body.enemy][req.body.fateObj]);
    });
}

// UPDATE USER POINTS +3
exports.put = (req, res, next) => {
    User.findById(req.session.user, (err, user) => {
        if (err) return next(err); 

        User.update({ _id: user._id }, { $set: { points: 3 }}, err => err);   
        res.end(); 
    });   
}




