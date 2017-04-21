import checkStatus from "../helper/checkStatus";
import {show, hide} from "../helper/showHide";
import {$} from "../helper/querySelector";

let $map = $(".map");

function getStartData (data) {
    fetch('/game', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => {

        if (res.headers.get("showRules")) {
            $map.show()
        } else {
            $map.hide()
        }
    })
    .catch(error => console.log(error));

}

