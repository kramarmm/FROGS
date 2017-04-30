import logInPost from './logInPost';
import signUpPost from './signUpPost';

let sendAuthData = () => {
    let login = document.querySelector("[name='login']"),
        password = document.querySelector("[name='password']"),
        $authBtn = document.querySelector("#authBtn"); 

    if( !login.value || !password.value ) {
        login.classList.add("empty-value");
        password.classList.add("empty-value");
        return;
    }
    console.log($authBtn.getAttribute("mode"));

    switch ($authBtn.getAttribute("mode")) {
        case "log-in": 
            logInPost(login, password);
            break;
        case "sign-up":
            signUpPost(login, password);
            break;
    }
}

export default sendAuthData;



