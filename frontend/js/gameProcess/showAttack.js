import {show, hide} from "../helper/showHide";
import {$} from "../helper/querySelector";

let $map = $(".map");
let $attack = $(".lazy-attack");

let showAttack = function(enemy) {
    hide($map);
    $attack.setAttribute("data-enemy", enemy);
    show($attack);


}

export default showAttack;