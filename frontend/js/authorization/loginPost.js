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
        let $wrapper = document.querySelector(".wrapper");
        // while ($wrapper.firstChild) $wrapper.removeChild($wrapper.firstChild);
        $wrapper.innerHTML = body;
    })
    .catch(error => console.log('request failed', error));

}

export default loginPost;