var path = require('path');
var User = require('../models/user').User;
var Comment = require('../models/comment').Comment;
var sendCommentToMyEmail = require('../middleware/sendCommentToMyEmail');

exports.get = (req, res, next) => {
    User.findById(req.session.user, function(err, user) {
        if (err) return next(err); 

        if (!user.bossWasSeen) {
            res.redirect("/game");
            return;
        }
        res.sendFile(path.join(__dirname, '../../public', "comments.html"));
    })
}


// NEW COMMENT
exports.post = (req, res, next) => {
    User.findById(req.session.user, (err, user) => {
        if (err) return next(err); 

        var comment = new Comment({
            login: user.login,
            text: req.body.text
        });

        comment.save(err => { if (err) return err });

        sendCommentToMyEmail(req.body.text);

        res.json({
            login: comment.login,
            date: comment.date,
            text: comment.text
        })
        res.end();
    });
}