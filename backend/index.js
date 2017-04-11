var express = require('express'),
    favicon = require('serve-favicon'),    
    path = require('path'),

    app = express();


app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/game', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/game.html'));
});


app.listen(3000, () => console.log('Privet ot servera'));

