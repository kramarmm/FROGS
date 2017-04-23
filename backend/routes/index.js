var checkAuth = require("../middleware/checkAuth");

module.exports = (app) => {

app.post('/login', require("./login").post);
app.post('/signin', require("./signin").post);

// app.get("/game", require("./game").get);
app.get("/game", checkAuth, require("./game").get);
app.get("/user/info", checkAuth, require("./userInfo").get);

}