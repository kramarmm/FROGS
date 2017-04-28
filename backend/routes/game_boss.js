var path = require('path');
var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        if (!user.bossWasSeen) {
            User.update({ _id: user._id }, {$set: { bossWasSeen: true }}, err => err);
        }

        res.send('<img src="../images/boss_outcome.png" class="boss-image"/>');
        res.end();
    });
    
}