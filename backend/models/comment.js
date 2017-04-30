var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  login: {
    type: String
  },
  date: {
    type: String,
    default: new Date().toDateString()
  },
  text: {
    type: String
  }
});


exports.Comment = mongoose.model('Comment', schema);