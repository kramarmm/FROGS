let sendAuthData = () => {
    let login = document.querySelector("[name='login']"),
        password = document.querySelector("[name='password']"),
        $loginBtn = document.querySelector("#loginBtn"); 

    if( !login.value || !password.value ) {
        login.classList.add("empty-value");
        password.classList.add("empty-value");
        return;
    }

    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
     
    let promise = fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value,
            mode: $loginBtn.getAttribute("mode")
        })
    })
    .then(checkStatus)
    .then(response => response.text())
    .then((body) => {
        let $wrapper = document.querySelector(".wrapper");
        while ($wrapper.firstChild) $wrapper.removeChild($wrapper.firstChild);
        $wrapper.innerHTML = body;
    })
    .catch(error => console.log('request failed', error));
}

export default sendAuthData;

