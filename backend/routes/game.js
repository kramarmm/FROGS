var path = require('path');

exports.get = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', "game.html"));
}

exports.post = (req, res, next) => {
    next();
}