let checkStatus = response => {
    if (response.status == 200) {
        return response;
    } else {
        var error = new Error(response.statusText);
        throw error;
    }
}

export default checkStatus;