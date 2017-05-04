import '../styles/auth/auth.styl';
import sendAuthData from './authorization/sendAuthData';
import toogleAuthMode from './authorization/toogleAuthMode';

document.addEventListener("DOMContentLoaded", ready);
function ready () {
    
if (screen.width < 900) {
    document.body.innerHTML = "<p>Извините,</br> но это приложение не предназначено для мобильных устройств.</p>";
    return;
}

    let $logIn = document.querySelector("#logIn");
    let $signUp = document.querySelector("#signUp");

    let $authBtn = document.querySelector("#authBtn");

    $logIn.addEventListener("click", () => toogleAuthMode($logIn, $signUp));
    $signUp.addEventListener("click", () => toogleAuthMode($signUp, $logIn)); 
    
    $authBtn.addEventListener("click", sendAuthData);
    document.addEventListener("keypress", e => {if (e.keyCode == 13) sendAuthData()});
}