import '../styles/game.styl';
import checkStatus from "./helper/checkStatus";
import {show, hide} from "./helper/showHide";
import {$} from "./helper/querySelector";

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    let $rules = $(".rules");
    let $map = $(".map");
    let $points = $(".points");
    let $userName = $("#userName");
    let $attack = $(".attack");

    let $chi = $(".chi");
    let $goose = $(".goose");
    let $lazy = $(".lazy");
    let $gir = $(".gir");

    let showAttack = function(enemy) {
        
        let enemiesImages = document.querySelectorAll(".image-attack");
        let imageToShow = null;
        enemiesImages.forEach((image) => {
            if (image.getAttribute("data-enemy-image") == enemy) imageToShow = image;
        });
        $attack.setAttribute("data-enemy", enemy);
        show(imageToShow);
        hide($map);
        show($attack);
    }

    $chi.addEventListener("click", () => showAttack("chi"));

    fetch('/user/info', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
        json.showRules ? show($rules) : show($map);
        $points.textContent = json.points;
        $userName.textContent = json.login;
    })
    .catch(error => console.log(error));



}

