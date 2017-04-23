var crypto = require('crypto');
var async = require("async");
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 9
  },
  passedIslands: {
    type: Array,
    default: []
  },
  showRules: {
    type: Boolean,
    default: true
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

// LOGIN
schema.statics.login = function(login, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      User.findOne({login: login}, callback);
    },
    function(user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Invalid password"));
        }
      } else {
          callback(new AuthError("No user"));
      }
    }
  ], callback);
};


// SIGNIN
schema.statics.signin = function(login, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      var user = new User({login: login, password: password});
      user.save( function(err) {
        if (err) return callback(new AuthError("Login is already in use"));
        callback(null, user);
      });
    }
  ], callback);
};



exports.User = mongoose.model('User', schema);



function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
