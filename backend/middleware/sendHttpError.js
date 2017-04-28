module.exports = function(req, res, next) {

  res.sendHttpError = function(error) {

    res.status(error.status);
    res.set("errorMessage", error.message);
    res.end();
  };

  return next();

};