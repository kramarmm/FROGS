import checkStatus from "../helper/checkStatus";

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
    .then(checkStatus)
    .then(() => document.location.href = "/game")
    .catch(error => console.log(error));

}

export default signinPost;