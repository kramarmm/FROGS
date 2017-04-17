import './styles/login.styl';
import sendAuthData from './sendAuthData';
import toogleAuthMode from './toogleAuthMode';

document.addEventListener("DOMContentLoaded", ready);
function ready () {

    let $logIn = document.querySelector("#logIn"),
        $signIn = document.querySelector("#signIn");

    $logIn.addEventListener("click", () => toogleAuthMode($logIn, $signIn));
    $signIn.addEventListener("click", () => toogleAuthMode($signIn, $logIn));
    

    let $loginBtn = document.querySelector("#loginBtn");
    $loginBtn.addEventListener("click", sendAuthData);
}