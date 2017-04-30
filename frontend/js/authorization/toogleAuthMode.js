let toogleAuthMode = (target, another) => {
    let $authBtn = document.querySelector("#authBtn");  


    target.classList.add("choosen-auth");
    another.classList.remove("choosen-auth");    

    if (target.textContent === "вход") {
        $authBtn.textContent = "войти";
        $authBtn.setAttribute("mode", "log-in");
    } else {
        $authBtn.textContent = "зарегистрироваться";
        $authBtn.setAttribute("mode", "sign-up");
    }
}

export default toogleAuthMode;