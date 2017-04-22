import '../styles/game.styl';


import checkStatus from "./helper/checkStatus";
import {show, hide} from "./helper/showHide";
import {$} from "./helper/querySelector";


document.addEventListener("DOMContentLoaded", ready);
function ready () {

    let $rules = $(".rules");

    fetch('/game', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => {
        // console.log(res.headers.get("showRules"));
        (res.headers.get("showRules") === "true")
        ? show($rules)
        : hide($rules)
    })
    .catch(error => console.log(error));



}

