import '../styles/game.styl';


import checkStatus from "./helper/checkStatus";
import {show, hide} from "./helper/showHide";
import {$} from "./helper/querySelector";


document.addEventListener("DOMContentLoaded", ready);
function ready () {


let $rules = $(".rules);

function getStartData (data) {
    fetch('/game', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => {
        if (res.headers.get("showRules")) {
            $rules.show()
        } else {
            $rules.hide()
        }
    })
    .catch(error => console.log(error));

}




}

