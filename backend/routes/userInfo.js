var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) console.log(err);    

        res.json({
            showRules: user.showRules,
            passedIslands: user.passedIslands,
            points: user.points,
            login: user.login
        });
        console.log(user);
    });
}