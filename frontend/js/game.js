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
    let $pointsResult = $(".points-result");

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
        json.passedIslands.forEach(island => removeE(island));
    })
    .catch(error => console.log(error));


    // ATACK THE ISLAND
    let showAttack = function(e) {
        let enemy = e.currentTarget.classList[0];
        let imageToShow = null;
        $enemiesImages.forEach((image) => {
            if (image.getAttribute("data-enemy-image") == enemy) imageToShow = image;
        });
        $attack.setAttribute("data-enemy", enemy);
        show(imageToShow);
        hide($map);
        show($attack);
    }

    $gir.addEventListener("click", showAttack);   
    $lazy.addEventListener("click", showAttack);   
    $goose.addEventListener("click", showAttack);   
    $chi.addEventListener("click", showAttack);   

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

        let enemy = $attack.getAttribute("data-enemy");
        fetch('/game', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                enemy: enemy,
                fateObj: $attackBtn.getAttribute("chosen-object-number")
            })
        })
        .then(checkStatus)
        .then(res => {
            $points.textContent = res.headers.get("points");

            if (res.headers.get("win") === "true") {
                $pointsResult.textContent = "Победа!";
                $pointsResult.classList.add("green");

                removeE(enemy);

            } else {
                $pointsResult.textContent = "Поражение!";
                $pointsResult.classList.remove("green");
            }
            return res.text()
        })
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

    // REMOVE EVENT LISTENERS FROM WINED ENEMIES
    let removeE = (enemy) => {
        let winedEnemy = document.getElementsByClassName(enemy)[0];
        winedEnemy.removeEventListener("click", showAttack);
        winedEnemy.classList.remove(enemy); 
        winedEnemy.classList.add(enemy + "-passed");
    }

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

