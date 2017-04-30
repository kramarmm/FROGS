let checkAuthStatus = res => {
    let $errorSound = document.querySelector(".error-sound");
    if (res.status === 403) {
        let errorsOutput = document.querySelector(".invalid-data");
        $errorSound.play();
        switch (res.headers.get("errorMessage")) {
            case "Incorrect password":
                errorsOutput.textContent = "Неверный пароль"
                break;
            case "No such user":
                errorsOutput.textContent = "Нет пользовтеля с таким логином"
                break;
            case "Login is already in use":
                errorsOutput.textContent = "Логин уже используется"
                break;
        }
        return;
    }
    if (res.status === 200) {
        localStorage.clear();
        document.location.href = "/game";
    } else {
    return err;
    }
}

export default checkAuthStatus;