var checkAuth = require("../middleware/checkAuth");

module.exports = (app) => {

    app.post("/logIn", require("./logIn").post);
    app.post("/signUp", require("./signUp").post);

    app.get("/user/info", checkAuth, require("./user_info").get);

    app.get("/game", checkAuth, require("./game").get);
    app.post("/game", require("./game").post);
    app.put("/game", require("./game").put);

    app.get("/game/boss",checkAuth, require("./game_boss").get);

    app.get("/comments", checkAuth, require("./comments").get);
    app.post("/comments", require("./comments").post);

    app.get("/comments/all", require("./comments_all").get);

}