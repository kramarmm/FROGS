var express = require('express'),
    favicon = require('serve-favicon'),    
    path = require('path'),

    app = express();


app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); 
app.use('/', express.static(path.join(__dirname, '../public')));


app.listen(3000, () => console.log('Privet ot servera'));

