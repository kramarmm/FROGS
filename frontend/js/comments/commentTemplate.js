let commentTemplate = (logn, dat, txt) => {
    let commentTemplate = document.createElement("div");
    commentTemplate.classList.add("comment-template");

    let login = document.createElement("span");
    login.classList.add("login");
    login.textContent = logn;

    let date = document.createElement("span");
    date.classList.add("date");
    date.textContent = dat;

    let text = document.createElement("p");
    text.classList.add("text");
    text.textContent = txt; 

    commentTemplate.appendChild(login);
    commentTemplate.appendChild(date);
    commentTemplate.appendChild(text);

    return commentTemplate;
}

export default commentTemplate;