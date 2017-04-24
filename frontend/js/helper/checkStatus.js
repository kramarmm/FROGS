let checkStatus = response => {
    if (response.status == 200) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
}

export default checkStatus;