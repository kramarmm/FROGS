import '../styles/comments/comments.styl';
import sendComment from "./comments/sendComment";
import getAllComments from "./comments/getAllComments";
import {$} from "./helper/querySelector";

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    getAllComments();

    let $sendCommentBtn = $("#sendComment");
    $sendCommentBtn.addEventListener("click", sendComment); 
    document.addEventListener("keypress", e => {if (e.keyCode == 13) sendComment()});   
}