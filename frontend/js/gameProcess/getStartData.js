import checkStatus from "../helper/checkStatus";
import {show, hide} from "../helper/showHide";
import {$} from "../helper/querySelector";

let $rules = $(".rules");

function getStartData () {
    fetch('/game', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => {
        if (res.headers.get("showRules")) {
            console.log(res.headers.get("showRules"));
            show($rules)
        } else {
            hide($rules)
        }
    })
    .catch(error => console.log(error));


}

export default getStartData;

