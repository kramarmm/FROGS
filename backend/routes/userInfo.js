exports.get = (req, res, next) => {

    res.json({
        showRules: req.user.showRules,
        passedIslands: req.user.passedIslands,
        points: req.user.points,
        login: req.user.login
    });
    console.log(req.user);
}

exports.post = (req, res, next) => {
    next();
}