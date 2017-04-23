import checkStatus from "../helper/checkStatus";

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
    .then( res => res.headers.get("errorMessage"))
    .then(err => document.querySelector(".invalid-data").textContent = err)
    // .then(() => document.location.href = "/game")
    .catch(error => console.log(error));
}

export default loginPost;