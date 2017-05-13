import '../styles/auth/auth.styl';
import sendAuthData from './authorization/sendAuthData';
import toogleAuthMode from './authorization/toogleAuthMode';
import {detectMobile, appendScaleMeta} from './helper/ifIsMobile';
import {show, hide} from "./helper/showHide";

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    // FOR MOBILE DEVICES
    var isMobile = detectMobile() || false;

    var $mobileRecommend = document.querySelector(".mobile-recommend");
    var $wrapper = document.querySelector(".wrapper");

    // EVENT ORIENTATION CHANGE
    var orinentChanged = false;

    var hideRecommend = () => {
        orinentChanged = true;
        hide($mobileRecommend);
        appendScaleMeta();
        show($wrapper);      
        if (orinentChanged) {
            document.removeEventListener("orientationchange", hideRecommend);
        }
    }

    if (isMobile) {
        if (window.screen.orientation.type.match("portrait") ) {
            show($mobileRecommend);

            document.addEventListener("orientationchange", hideRecommend);

            setTimeout((() => {
                hide($mobileRecommend);
                appendScaleMeta();
                show($wrapper);
            }), 2000);

        } else {
            appendScaleMeta();
            show($wrapper);
        } 
    } else {
        show($wrapper);
    }


    // AUTHORIZATION
    let $logIn = document.querySelector("#logIn");
    let $signUp = document.querySelector("#signUp");

    let $authBtn = document.querySelector("#authBtn");

    $logIn.addEventListener("click", () => toogleAuthMode($logIn, $signUp));
    $signUp.addEventListener("click", () => toogleAuthMode($signUp, $logIn)); 
    
    $authBtn.addEventListener("click", sendAuthData);
    document.addEventListener("keypress", e => {if (e.keyCode == 13) sendAuthData()});
}