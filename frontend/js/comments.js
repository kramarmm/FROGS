import '../styles/comments/comments.styl';
import sendComment from "./comments/sendComment";
import getAllComments from "./comments/getAllComments";
import {$} from "./helper/querySelector";
import {detectMobile, appendScaleMeta} from './helper/ifIsMobile';

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    var isMobile = detectMobile() || false;
    if (isMobile) appendScaleMeta();

    let $comment = $("[name='comment']");
    let $sendCommentBtn = $("#sendComment");
    let $commentsSound = $(".comments-sound");

    $commentsSound.play();

    getAllComments();
    
    $sendCommentBtn.addEventListener("click", sendComment); 
    document.addEventListener("keypress", e => {if (e.keyCode == 13) sendComment()});  

    $comment.addEventListener("change", e => {
        if ($comment.value) {
                e.target.classList.remove("empty-value");
                e.target.classList.add("filled-value");
        } else {
                e.target.classList.remove("filled-value"); 
        }
    });
}