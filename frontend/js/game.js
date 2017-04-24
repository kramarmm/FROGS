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
    let $attackErrorText = $(".attack-error-text");
    let $info = $(".info");
    let $okay = document.querySelectorAll(".okay");
    let $close = document.querySelectorAll(".close");
    let $fateObj = document.querySelectorAll(".fate-obj");
    let $enemiesImages = document.querySelectorAll(".image-attack");
    let $outcome = $(".outcome");
    let $outcomeText = $(".outcome-text");

    let $gir = $(".gir");
    let $lazy = $(".lazy");
    let $goose = $(".goose");
    let $chi = $(".chi");    
    

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
        let imageToShow = null;
        $enemiesImages.forEach((image) => {
            if (image.getAttribute("data-enemy-image") == enemy) imageToShow = image;
        });
        $attack.setAttribute("data-enemy", enemy);
        show(imageToShow);
        hide($map);
        show($attack);
    }

    $gir.addEventListener("click", () => showAttack("gir"));   
    $lazy.addEventListener("click", () => showAttack("lazy"));   
    $goose.addEventListener("click", () => showAttack("goose"));   
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
            $attackErrorText.classList.add("visible");
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
        .then(checkStatus)
        .then(res => res.text())
        .then(text => {
            $outcomeText.textContent = text;
            hide($attack);
            show($outcome);  
        })
        .then( () => {
            $fateObj.forEach(fate => fate.classList.remove("choosen-fate"));
            $attackBtn.setAttribute("chosen-object-number", "");
            $attackErrorText.classList.remove("visible");
            $enemiesImages.forEach(image => hide(image));
        })
        .catch(error => console.log(error))
    });

    // CLOSE AND OKAY BUTTONS
    let close = (elem, num) => {
        if (elem.parentElement === $attack) $enemiesImages.forEach(image => hide(image));
        hide(elem.parentElement);
        show($map);
    }
    $close.forEach(closeBtn => closeBtn.addEventListener("click", () => close(closeBtn)));
    $okay.forEach(okayBtn => okayBtn.addEventListener("click", () => close(okayBtn)));

    // INFO BUTTON
    $info.addEventListener("click", () => {
        hide($map);
        show($rules);        
    });
}

