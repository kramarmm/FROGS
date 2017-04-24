var checkAuth = require("../middleware/checkAuth");

module.exports = (app) => {

app.post('/login', require("./login").post);
app.post('/signin', require("./signin").post);


app.get("/game", checkAuth, require("./game").get);
app.post("/game", require("./game").post);
app.get("/user/info", checkAuth, require("./userInfo").get);

}