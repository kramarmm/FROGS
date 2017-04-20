var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
  console.log(req.session.user);
  if (!req.session.user) {
    return next(new HttpError(401, "Вы не авторизованы"));
  }

  next();
};