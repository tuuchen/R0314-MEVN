require('dotenv').config()
const Movie = require("./movieSchema");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    // dbName: "sample_mflix",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    getData: function (query, callback) {

        var query = {
            title: new RegExp(query, 'i')
        };

        Movie.find(query, function (err, results) {
            console.log(err || results);
            callback(err, results);
        }).sort({ year: -1 }).limit(6000);
    },
    postData: function (query, callback) {

        var newMovie = new Movie({
            title: query.title,
            year: new Date().getFullYear(),
            genres: query.genres,
            cast: query.cast,
            fullplot: query.fullplot,
            poster: query.poster
        });

        newMovie.save(function (err, result) {
            console.log(err || result);
            let data = [result];
            callback(err, data);
        });
    },
    editData: function (query, callback) {

        var editMovie = {
            title: query.title,
            genres: query.genres,
            cast: query.cast,
            fullplot: query.fullplot,
            poster: query.poster
        };

        Movie.findOneAndUpdate({ _id: query._id }, editMovie, { new: true }, function (err, result) {
            console.log(err || result);
            let data = [result];
            callback(err, data);
        });

    },
    deleteData: function (query, callback) {

        Movie.findByIdAndDelete(query, function (err, results) {
            if (err) {
                console.log(err);
                callback("Error.", 500);
            }
            else {
                callback("Ok", 200);
            }
        });
    }
};