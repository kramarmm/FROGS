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
    let $attackBtn = $("#attackBtn");
    let $info = $(".info");
    let $okay = document.querySelectorAll(".okay");
    let $close = document.querySelectorAll(".close");
    let $fateObj = document.querySelectorAll(".fate-obj");

    let $chi = $(".chi");
    let $goose = $(".goose");
    let $lazy = $(".lazy");
    let $gir = $(".gir");

    // GET USER DATA
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


    // ATACK THE ISLAND
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

    // CHOOSE FATE OBJECT
    $fateObj.forEach((fate, i) => fate.addEventListener("click", () => {     
        $fateObj.forEach(fate => fate.classList.remove("choosen-fate"));
        fate.classList.add("choosen-fate");
        $attackBtn.setAttribute("chosen-object-number", i);
    }));

    // POST ATTACK
    $attackBtn.addEventListener("click" , () => {
        if (!$attackBtn.getAttribute("chosen-object-number")) {
            console.log("Choose your object!");
            return;
        }
        fetch('/game', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                enemy: $attack.getAttribute("data-enemy"),
                fateObj: $attackBtn.getAttribute("chosen-object-number")
            })
        })
        // .then(checkAuthStatus)
        // .then(res => console.log(res))
        .catch(error => console.log(error));
    });

    // CLOSE AND OKAY BUTTONS
    let close = (num) => {
        hide($close[num].parentElement);
        show($map);
    }
    $close.forEach((closeBtn, i) => closeBtn.addEventListener("click", () => close(i)));
    $okay.forEach((okayBtn, i) => okayBtn.addEventListener("click", () => close(i)));

    // INFO BUTTON
    $info.addEventListener("click", () => {
        hide($map);
        show($rules);        
    });
}

