var User = require('../models/user').User;

exports.get = (req, res, next) => {
    User.findById(req.session.user, (err, user) => {
        if (err) return next(err);    

        res.json({
            showRules: user.showRules,
            passedIslands: user.passedIslands,
            bossWasSeen: user.bossWasSeen,
            points: user.points,
            login: user.login
        });
        res.end();
    });
}

