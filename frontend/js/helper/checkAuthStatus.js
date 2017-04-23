let checkAuthStatus = res => {
        if (res.status === 403) {
            document.querySelector(".invalid-data").textContent = res.headers.get("errorMessage");
            return;
        }
        if (res.status === 200) {
            document.location.href = "/game";
        } else {
        return err;
        }
}

export default checkAuthStatus;