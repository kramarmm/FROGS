import checkStatus from "./checkStatus";

let loginPost = (login, password) => {
    let promise = fetch('/login', {
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
    .then(response => response.text())
    .then((body) => {
        document.location.href = "/game";
    })
    .catch(error => console.log('request failed', error));
}

export default loginPost;