import checkAuthStatus from "../helper/checkAuthStatus";

let signinPost = (login, password) => {
fetch('/signin', {
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

export default signinPost;