var path = require('path');
var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        if (!user.bossWasSeen) {
            res.redirect("/game");
            return;
        }
        res.sendFile(path.join(__dirname, '../../public', "comments.html"));
    })
}

exports.post = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 
    });
}