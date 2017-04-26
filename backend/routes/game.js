var path = require('path');
var outcome = require('./outcome.json');
var checkWin = require('../middleware/checkWin');
var User = require('../models/user').User;

exports.get = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', "game.html"));    
}

exports.post = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        User.update({ _id: user._id }, {$set: { points: --user.points }}, err => err); 

        if (checkWin(req.body.enemy, req.body.fateObj)) {
            User.update({ _id: user._id }, {$push: { passedIslands: req.body.enemy }}, err => err); 
        }

        res.set("win", checkWin(req.body.enemy, req.body.fateObj));
        res.set("points", user.points);
        res.send(outcome[req.body.enemy][req.body.fateObj]);
    });
}

exports.put = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 
        User.update({ _id: user._id }, { $set: { points: 3 }}, err => err);
    });
}
    
