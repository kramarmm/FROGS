import '../styles/game.styl';


import checkStatus from "./helper/checkStatus";
import {show, hide} from "./helper/showHide";
import {$} from "./helper/querySelector";


document.addEventListener("DOMContentLoaded", ready);
function ready () {

    let $rules = $(".rules");
    let $map = $(".map");

    fetch('/user/info', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(json => json.showRules ? show($rules) : show($map))
    .catch(error => console.log(error));



}

