var path = require('path');

exports.get = (req, res, next) => {
    res.set("showRules", req.user.showRules + "");
    res.set("passedIslands", req.user. passedIslands + "");
    res.set("points", req.user. points + "");
    res.sendFile(path.join(__dirname, '../../public', "game.html"));
    console.log(req.user);
}

exports.post = (req, res, next) => {
    next();
}