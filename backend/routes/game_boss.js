var path = require('path');
var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        if (!user.bossWasSeen) {
            User.update({ _id: user._id }, {$set: { bossWasSeen: true }}, err => err);
        }

        res.write('<img src="../images/boss_outcome.png" class="boss-image"/>');
        res.write('<img src="../images/boss_levitation.png" class="boss_levitation"/>');
        res.end();
    });
    
}