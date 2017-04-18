var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/game');



var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({
  name: 'Zildjian'
});

console.log(kitty);

kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});