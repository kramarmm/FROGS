var MongoClient = require('mongodb').MongoClient,
  format = require('util').format;

MongoClient.connect("mongodb://127.0.0.1:27017/game", (err, db) => {
  var collection = db.collection("sessions");

  var cursor = collection.find();
  cursor.toArray((err, result) => {
    console.log(result);
    db.close();
  });
});


