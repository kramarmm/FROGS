var path = require('path');

exports.get = (req, res, next) => {
    // express.static(path.join(__dirname, '../../public', "game1.html"));
    next();
}

exports.post = (req, res, next) => {
    next();
}