module.exports = {
    getData: function (query, callback) {

        const MongoClient = require("mongodb").MongoClient;
        // URI hidden in Heroku and local .env -file 
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var query = {
            title: new RegExp(query, 'i')
        };

        client.connect(err => {
            const collection = client.db("sample_mflix").collection("movies");
            if (err) throw err;

            collection
                .find(query)
                .sort({ year: -1 })
                .toArray(function (err, result) {
                    if (err) throw err;
                    // console.log(result);
                    client.close();
                    callback(err, result);
                    client.close();
                });
        });
    },
    postData: function (movieData, callback) {

        const MongoClient = require("mongodb").MongoClient;
        // URI hidden in Heroku and local .env -file 
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var query = {
            title: new RegExp(movieData.title)
        };

        var newMovie = {
            title: movieData.title,
            year: new Date().getFullYear(),
            genres: [movieData.genres],
            cast: [movieData.cast],
            fullplot: movieData.fullplot,
            poster: movieData.poster
        };

        client.connect(err => {
            const collection = client.db("sample_mflix").collection("movies");
            if (err) throw err;

            collection.insertOne(newMovie, function (err, r) {
                // How many added, should be (1)
                console.log(r.insertedCount);
            });

            collection
                .find(query)
                .limit(1)
                .sort({ _id: -1 })
                .toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    callback(err, result);
                    client.close();
                });
        });
    }
};