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

    req.session.user = user._id;
    res.send({});

  });
}









// exports.post = (req, res, next) => {
//     console.log(req.body);
//     var login = req.body.login;
//     var password = req.body.password;

//     if (req.body.mode === "log_in") {
//         async.waterfall([
//            callback => User.findOne({login: login}, (callback)),
//            (user, callback) => {
//                if (user) {
//                     if (user.checkPassword(password)) {
//                         callback(null, user);
//                     } else {
//                         // 403
//                     } 
//                 } else {
//                     // no such user
//                 }
//            }
//         ], (err) => {
//             if (err) return next(err);
//             req.session.user = user._id;
//             res.send({});
//         });
//     }

//     if (req.body.mode === "sign_in") {
//         var user = new User({login: login, password: password});
//         user.save((err) => {
//             if (err) return next(err);
//             // 200
//             req.session.user = user._id;
//         });
//     }




// module.exports.checkUserAuth = ( login, password ) => {
//     let authUser = false; 
//     users.forEach((user) => {
//         (user.login === login && user.password === password) ? authUser = true : authUser = false;
//     });
//     return authUser;
// }