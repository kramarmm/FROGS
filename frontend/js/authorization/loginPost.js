import checkAuthStatus from "../helper/checkAuthStatus";

let $invalidData = document.querySelector(".invalid-data");
let loginPost = (login, password) => {
fetch('/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value
        })
    })
    .then(checkAuthStatus)
    .catch(error => console.log(error));
}

export default loginPost;