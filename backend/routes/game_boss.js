var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        User.update({ _id: user._id }, {$set: { bossWasSeen: true }}, err => err);

        res.send("BOSS is GOD!");
    });
    
}