var User = require('./models/user').User;

var user = new User({
  username: "Tester" + Math.random()*10,
  password: "secret"
});

user.save(function(err, user, affected) {
  console.log(user);
});

// second

// var mongoose = require('./lib/mongoose');
// var async = require('async');
// var User = require('./models/user').User;

// mongoose.connection.on("open", () => {

//   var db = mongoose.connections.db;
//   db.dropDatabase( (err) => {
//     if (err) throw err;

//     async.parallel([
//       function (callback) {

//       }  
//     ])
//   })
// });