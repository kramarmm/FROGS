var mongoose = require('mongoose');
var config = require('../config');


mongoose.Promise = global.Promise;

 var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGODB_URI ||
    config.get('mongoose:uri');


mongoose.connect(uristring, config.get('mongoose:options'));


module.exports = mongoose;