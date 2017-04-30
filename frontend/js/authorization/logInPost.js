import checkAuthStatus from "./checkAuthStatus";

let logInPost = (login, password) => {
fetch('/logIn', {
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

export default logInPost;