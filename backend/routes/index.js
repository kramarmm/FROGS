var checkAuth = require("../middleware/checkAuth");

module.exports = (app) => {

    app.post("/login", require("./login").post);
    app.post("/signin", require("./signin").post);

    app.get("/user/info", checkAuth, require("./user_info").get);

    app.get("/game", checkAuth, require("./game").get);
    app.post("/game", require("./game").post);
    app.put("/game", require("./game").put);

    app.get("/game/boss", require("./game_boss").get);

    app.get("/comments", require("./comments").get);

}