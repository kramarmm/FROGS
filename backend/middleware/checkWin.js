module.exports = function(enemy, fateObj) {

    var winComb = {
        "chi": "1",
        "goose": "0",
        "gir": "3",
        "lazy": "1"
    }

    if (winComb[enemy] == fateObj) {
        return true;
    } else {
        return false;
    }

}