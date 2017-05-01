import {$} from "../helper/querySelector";
import checkStatus from "../helper/checkStatus";
import commentTemplate from "./commentTemplate";

let sendComment = () => {
    let $comment = $("[name='comment']");
    let usersComments = $("#usersComments");
    let $buttonsSound = $(".buttons-sound");

        if( !$comment.value ) {
            $comment.classList.remove("filled-value");
            $comment.classList.add("empty-value");
            return;
        }

        $buttonsSound.play();
        fetch("/comments", {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: $comment.value
            })
        })
        .then(checkStatus)
        .then(res => res.json())
        .then(json => {
            usersComments.insertBefore(commentTemplate(
                json.login,
                json.date,
                json.text
            ), usersComments.firstChild);
        })
        .then(() => {
            $comment.value = "";
            $comment.classList.remove("empty-value");
            $comment.classList.remove("filled-value");
        })
        .catch(error => console.log(error))
}

export default sendComment;