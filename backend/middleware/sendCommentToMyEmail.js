const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.SENDER,
pass: process.env.PASSWORD
}
});

let sendCommentToMyEmail = commentText => {
// setup email data with unicode symbols
let mailOptions = {
from: process.env.SENDER, // sender address
to: process.env.ME, // list of receivers
subject: 'Comment on FROGS', // Subject line
text: commentText // plain text body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (err, info) => {
if (err) return next(err);
});
}

module.exports = sendCommentToMyEmail;



// HOW TO REMOVE FILE FROM ALL COMMITS

// git filter-branch --index-filter "git rm --cached --ignore-unmatch backend/middleware/sendCommentToMyEmail.js" HEAD
// git push origin --force --all