const Movie = require("./movieSchema");
const mongoose = require('mongoose');

module.exports = {
    getData: function (req, res) {

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var query = {
            title: new RegExp(req, 'i')
        };

        Movie.find(query, function (err, results) {
            console.log(err || results);
            res(err, results);
        }).sort({ year: -1 });

    },
    postData: function (req, res) {

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var newMovie = new Movie({
            title: req.title,
            year: new Date().getFullYear(),
            genres: [req.genres],
            cast: [req.cast],
            fullplot: req.fullplot,
            poster: req.poster
        });

        newMovie.save(function (err, result) {
            console.log(err || result);
            let data = [result];
            res(err, data);
        });
    }
};