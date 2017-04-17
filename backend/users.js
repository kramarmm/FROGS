var express = require('express'),
    app = express();


var users = require('./users.json');



module.exports.checkUserAuth = ( login, password ) => {
    let authUser = false; 
    users.forEach((user) => {
        (user.login === login && user.password === password) ? authUser = true : authUser = false;
    });
    return authUser;
}

