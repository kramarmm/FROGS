var User = require("../models/user").User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require("async");

exports.post = function(req, res, next) {
  var login = req.body.login;
  var password = req.body.password;

  User.login(login, password, function(err, user) {
    if (err) {
      if (err instanceof AuthError) {
        console.log(err.message); // log error
        return next(new HttpError(403, err.message));
      } else {
        return next(err); // and send it up
      }
    }



    console.log('Cookies: ', req.cookies);
    req.session.user = user._id;
    req.session.test = "hello";
    // res.send({}); 

req.session.regenerate(function(err) {
  // will have a new session here
});
    res.send(user._id + "");

  });
}
