var path = require('path');

exports.get = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', "game.html"));    
}

exports.post = (req, res, next) => {
    console.log(req.body);
    res.send("Ты выиграл. Both request and response (and by extension the fetch() function), will try to intelligently determine the content type. A request will also automatically set a Content-Type header if none is set in the dictionary.");
    next();
}