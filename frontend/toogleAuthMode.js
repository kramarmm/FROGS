let toogleAuthMode = (target, another) => {
    let $logIn = document.querySelector("#logIn"),
        $signIn = document.querySelector("#signIn"),  
        $loginBtn = document.querySelector("#loginBtn");  

    let mode = "log in";  

    target.classList.add("choosen-auth");
    another.classList.remove("choosen-auth");    

    if (target.textContent === "вход") {
        mode = "log_in";
        $loginBtn.textContent = "войти";
        $loginBtn.setAttribute("mode", "log_in");
    } else {
        mode = "sign_in";
        $loginBtn.textContent = "зарегистрироваться";
        $loginBtn.setAttribute("mode", "sign_in");
    }

    return mode;
}

export default toogleAuthMode;