import loginPost from './loginPost';
import signinPost from './signinPost';

let sendAuthData = () => {
    let login = document.querySelector("[name='login']"),
        password = document.querySelector("[name='password']"),
        $loginBtn = document.querySelector("#loginBtn"); 

    if( !login.value || !password.value ) {
        login.classList.add("empty-value");
        password.classList.add("empty-value");
        return;
    }

    switch ($loginBtn.getAttribute("mode")) {
        case "log_in": 
            loginPost(login, password);
            break;
        case "sign_in":
            signinPost(login, password);
            break;
    }
}

export default sendAuthData;



