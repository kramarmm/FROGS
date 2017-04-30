import {$} from "../helper/querySelector";
import checkStatus from "../helper/checkStatus";
import commentTemplate from "./commentTemplate";

let getAllComments = () => {
    let usersComments = $("#usersComments");

        fetch("/comments/all", {
            credentials: 'same-origin',
            method: 'GET'
        })
        .then(checkStatus)
        .then(res => res.json())
        .then(json => {
            if (json["0"]) {
                for (const comment of json) {
                    usersComments.appendChild(commentTemplate(
                        comment.login,
                        comment.date,
                        comment.text
                    ));
                }
            }
        })
        .catch(error => console.log(error))
}

export default getAllComments;