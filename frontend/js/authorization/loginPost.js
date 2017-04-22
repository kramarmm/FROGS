import checkStatus from "../helper/checkStatus";

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
    .then( res => console.log(res.status, res))
    // .then(checkStatus)
    // .then(() => document.location.href = "/game")
    .catch(error => console.log(error));
}

export default loginPost;