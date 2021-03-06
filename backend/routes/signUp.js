var User = require("../models/user").User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.post = (req, res, next) => {
  var login = req.body.login;
  var password = req.body.password;

  User.signUp(login, password, (err, user) => {
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }

    req.session.user = user._id;
    res.end();

  });

}
