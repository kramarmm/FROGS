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
    let $attackResult = $(".attack-result");
    let $dimondsEnd = $(".dimonds-end");
    let $secconds = $("#secconds");

    let $gir = $(".gir");
    let $lazy = $(".lazy");
    let $goose = $(".goose");
    let $chi = $(".chi");    
    let $boss = $(".boss-close");    
    

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
    let showAttack = e => {
        let enemy = e.currentTarget.classList[0];
        let imageToShow = null;
        $enemiesImages.forEach(image => {
            if (image.getAttribute("data-enemy-image") == enemy) imageToShow = image;
        });
        $attack.setAttribute("data-enemy", enemy);
        show(imageToShow);
        hide($map);
        show($attack);
    }

    // EVENT LISTENERS FOR ALL ISLANDS    
    let eventCounter = 4;
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

            // WIN 
            if (res.headers.get("win") === "true") {
                $attackResult.textContent = "Победа!";
                $attackResult.classList.add("green");
                $points.textContent = ++$points.textContent;

                removeE(enemy);

            // LOSE
            } else {
                $attackResult.textContent = "Поражение!";
                $attackResult.classList.remove("green");
                $points.textContent = --$points.textContent;
            }
            return res.text()
        })
        .then(text => {
            $outcomeText.textContent = text;
            hide($attack);
            show($outcome); 
        })
        .then( () => {
            // CLEAR PREVIOUS ATTACK CHOISE
            $fateObj.forEach(fate => fate.classList.remove("choosen-fate"));
            $attackBtn.setAttribute("chosen-object-number", "");
            $attackErrorText.classList.remove("visible");
            $enemiesImages.forEach(image => hide(image));
        })
        .then( () => {
            // DIMONDS IS END
            if ($points.textContent <= "0") {
                $(".outcome>.close").addEventListener("click", blockGame);                
                $(".outcome>.okay").addEventListener("click", blockGame);                        
            } 
        })
        .catch(error => console.log(error))
    });

    // BLOCK GAME PROCESS 
    let blockGame = e => {
        hide($map);
        show($dimondsEnd);
        var timer = self.setInterval(() => {
            --$secconds.textContent;
            if ($secconds.textContent == "0") {
                window.clearInterval(timer);
                $(".outcome>.close").removeEventListener("click", blockGame);                
                $(".outcome>.okay").removeEventListener("click", blockGame);
                $points.textContent = 3;
                show($map);
                hide($dimondsEnd);

                // MAKE UPDATING USER POINTS IN DB
                fetch('/game', {
                    credentials: 'same-origin',
                    method: 'PUT'        
                })
                .catch(error => console.log(error));       
            }                    
        }, 1000); 
    }

    // REMOVE EVENT LISTENERS FROM WINED ENEMIES
    let removeE = (enemy) => {
        let winedEnemy = document.getElementsByClassName(enemy)[0];
        winedEnemy.removeEventListener("click", showAttack);
        winedEnemy.classList.remove(enemy); 
        winedEnemy.classList.add(enemy + "-passed");
    // CHECK IF BOSS IS AVAILABLE 
        eventCounter--;
        if (!eventCounter) showBoss();
    }

    // SHOW BOSS 
    let showBoss = () => {
        $boss.classList.remove("boss-close");
        $boss.classList.add("boss");

        $boss.addEventListener("click", () => {
            fetch('/game/boss', {
                credentials: 'same-origin',
                method: 'GET'        
            })
            .then(checkStatus)
            .then(res => {
                hide($map);
                return res.text();
            })
            .then(text => console.log(text))
            .catch(error => console.log(error));            
        }); 
    }


    // CLOSE AND OKAY BUTTONS
    let close = elem => {
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

