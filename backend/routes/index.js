module.exports = function (app) {

var fs = require('fs');
var login = require("../users.js");

app.post('/login', function(req, res) {

    ( login.checkUserAuth(req.body.login, req.body.password) ) ? fs.readdir(path.join(__dirname, '../public'), (err) => console.log(err)) : res.sendStatus(403);
    
});

var User = require('../models/user').User;
app.get("/users", (req,res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);
        res.json(users);
    })
});

app.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) next(new HttpError(404, "User not found"))
        res.json(user); 
    });
});

}