var Comment = require('../models/comment').Comment;

exports.get = (req, res, next) => {
    Comment.find({}).sort('-_id').exec((err, comments) => {
        if (err) return next(err); 
        
        res.send(comments);
    });   
}