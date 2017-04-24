import '../styles/login/login.styl';
import sendAuthData from './authorization/sendAuthData';
import toogleAuthMode from './authorization/toogleAuthMode';

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    let $logIn = document.querySelector("#logIn"),
        $signIn = document.querySelector("#signIn");

    $logIn.addEventListener("click", () => toogleAuthMode($logIn, $signIn));
    $signIn.addEventListener("click", () => toogleAuthMode($signIn, $logIn));    

    let $loginBtn = document.querySelector("#loginBtn");
    $loginBtn.addEventListener("click", sendAuthData);
    document.addEventListener("keypress", e => {if (e.keyCode == 13) sendAuthData()});
}