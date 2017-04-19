module.exports = (app) => {

app.post('/login', require("./login").post);
app.post('/signin', require("./signin").post);

app.get("/game", require("./game").get);

}