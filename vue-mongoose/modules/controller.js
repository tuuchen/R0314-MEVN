const mongo = require("./mongoose");

module.exports = {
    searchMovie: function (req, res) {
        let title = req.params.title
        mongo.getData(title, function (err, result) {
            res.send(result)
        });
    },
    addMovie: function (req, res) {
        let form = req.body
        mongo.postData(form, function (err, result) {
            res.send(result)
        });
    }
};
