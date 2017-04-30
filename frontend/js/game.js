import '../styles/game/game.styl';
import checkStatus from "./helper/checkStatus";
import {show, hide} from "./helper/showHide";
import {$} from "./helper/querySelector";

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    // ELEMENTS
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
    let $accentOnBoss = $(".accent-on-boss");
    let $theEnd = $(".the-end");

    // ISLANDS
    let $gir = $(".gir");
    let $lazy = $(".lazy");

    let $goose = $(".goose");
    let $gooseHint = $(".goose-hint");

    let $chi = $(".chi");    
    let $boss = $(".boss-close"); 

    // SOUNDS  
    let $succesAuth = $(".succes-auth");    
    let $loseSound = $(".lose-sound");    
    let $winSound = $(".win-sound");    
    let $buttonsSound = $(".buttons-sound");    
    let $hintSound = $(".hint-sound");    
    let $islandSound = $(".island-sound");    
    let $dimondsSound = $(".dimonds-sound");    
    let $bossSound = $(".boss-sound");
    let $errorSound = $(".error-sound");      


    // GET USER DATA
    fetch('/user/info', {
        credentials: 'same-origin',
        method: 'GET'        
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
        if (json.bossWasSeen) {
            getBossOutcome();
            return;
        }
        if (localStorage.secconds > 0) {
            $secconds.textContent = localStorage.secconds;
            blockGame();
        } else {
            $succesAuth.play();
        }
        
        if (json.showRules && !localStorage.showedRules) {
            show($rules);
            localStorage.showedRules = true;
        } else {
            show($map);
        }

        $points.textContent = json.points;
        $userName.textContent = json.login;
        json.passedIslands.forEach(island => removeE(island));
 
    })
    .catch(error => console.log(error));

    // MOUSEOVER
    let mouseover = e => {
        $hintSound.play();
        $("." + e.currentTarget.classList[0] + "-hint").classList.remove("transparent");   
    }
    // MOUSEOUT
    let mouseout = e => {
        $("." + e.currentTarget.classList[0] + "-hint").classList.add("transparent");     
    }

    // ATACK THE ISLAND
    let showAttack = e => {
        $islandSound.play();

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
    let islandEventListeners = (toogle, ...theElems) => {
        if (toogle === "add") {
            theElems.forEach(elem => {
                elem.addEventListener("click", showAttack);    
                elem.addEventListener("mouseover", mouseover);    
                elem.addEventListener("mouseout", mouseout);
            })
        } else if (toogle === "remove") {
            theElems.forEach(elem => {
                elem.removeEventListener("click", showAttack);    
                elem.removeEventListener("mouseover", mouseover);    
                elem.removeEventListener("mouseout", mouseout);
            })
        }
    }
    islandEventListeners("add",$gir, $lazy, $goose, $chi);
    let eventCounter = 4;

    // CHOOSE FATE OBJECT
    $fateObj.forEach((fate, i) => fate.addEventListener("click", () => {     
        $buttonsSound.play();

        $fateObj.forEach(fate => fate.classList.remove("choosen-fate"));
        fate.classList.add("choosen-fate");
        $attackBtn.setAttribute("chosen-object-number", i);
        $attackErrorText.classList.remove("visible");
    }));

    // POST ATTACK
    $attackBtn.addEventListener("click" , () => {
        if (!$attackBtn.getAttribute("chosen-object-number")) {
            $errorSound.play();
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
                $winSound.play();
                $attackResult.textContent = "Победа!";
                $attackResult.classList.add("green");
                $points.textContent = ++$points.textContent;

                removeE(enemy);

            // LOSE
        } else {
                $loseSound.play();
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
        $dimondsSound.play();
        show($dimondsEnd);
        show($map);
        hide($rules);
        
        // MAKE UPDATING USER POINTS IN DB
        fetch('/game', {
            credentials: 'same-origin',
            method: 'PUT'        
        }) 
        .then( () => {
            var timer = self.setInterval(() => {
                --$secconds.textContent;
                localStorage.secconds = $secconds.textContent;

                if (parseInt($secconds.textContent) <= 0) { 
                    $dimondsSound.pause();    
                    $succesAuth.play();
                                   
                    window.clearInterval(timer);
                    $(".outcome>.close").removeEventListener("click", blockGame);                
                    $(".outcome>.okay").removeEventListener("click", blockGame);
                    $points.textContent = 3;
                    hide($dimondsEnd);
                    $secconds.textContent = 30;                       
                }                    
            }, 1000);
        })
        .catch(error => console.log(error)); 
    }

    // REMOVE EVENT LISTENERS FROM WINED ENEMIES
    let removeE = (enemy) => {
        let winedEnemy = document.getElementsByClassName(enemy)[0];
        islandEventListeners("remove", winedEnemy);
        winedEnemy.classList.remove(enemy); 
        winedEnemy.classList.add(enemy + "-passed");
    // CHECK IF BOSS IS AVAILABLE 
        eventCounter--;
        if (!eventCounter) showBoss();
    }

    // SHOW BOSS 
    let showBoss = () => {
        show($accentOnBoss);
        $boss.classList.remove("boss-close");
        $boss.classList.add("boss");

        $boss.addEventListener("click", getBossOutcome);        
    }

    let getBossOutcome = () => {
        hide($accentOnBoss);
        fetch('/game/boss', {
            credentials: 'same-origin',
            method: 'GET'        
        })
        .then(checkStatus)
        .then(res => res.text())
        .then(text => {
            $bossSound.setAttribute("loop", "");
            $bossSound.play();
            hide($map);
            $theEnd.innerHTML = "<div class='close'></div>" + text;
            show($theEnd);
            $(".the-end>.close").addEventListener("click", () => location.href = "/comments");
        })
        .catch(error => console.log(error));  
    }  


    // CLOSE AND OKAY BUTTONS
    let close = e => {
        $buttonsSound.play();

        if (e.currentTarget.parentElement === $attack) $enemiesImages.forEach(image => hide(image));
        hide(e.currentTarget.parentElement);
        show($map);
        // CLEAR PREVIOUS FATE OBJECT CHOICE
        $attackErrorText.classList.remove("visible");
        $fateObj.forEach(fate => fate.classList.remove("choosen-fate"));
        $attackBtn.setAttribute("chosen-object-number", "");
    }
    
    $close.forEach(closeBtn => closeBtn.addEventListener("click", close));
    $okay.forEach(okayBtn => okayBtn.addEventListener("click", close));

    // INFO BUTTON
    $info.addEventListener("click", () => {
        $buttonsSound.play();
        hide($map);
        show($rules);        
    });
}

