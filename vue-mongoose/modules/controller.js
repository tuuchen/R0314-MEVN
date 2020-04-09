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
    },
    editMovie: function (req, res) {
        let form = req.body
        mongo.editData(form, function (err, result) {
            res.send(result)
        });
    },
    deleteMovie: function (req, res) {
        let id = req.params.id
        mongo.deleteData(id, function (err, result) {
            if (result === 200) {
                res.statusMessage = "Item deleted!";
            }
            res.send(result);
        });
    }
};
