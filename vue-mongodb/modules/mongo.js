module.exports = {
    getData: function (req, res) {

        const MongoClient = require("mongodb").MongoClient;
        // URI hidden in Heroku and local .env -file 
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var query = {
            title: new RegExp(req, 'i')
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
                    res(err, result);
                    client.close();
                });
        });
    },
    postData: function (req, res) {

        const MongoClient = require("mongodb").MongoClient;
        // URI hidden in Heroku and local .env -file 
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var query = {
            title: new RegExp(req.title)
        };

        var newMovie = {
            title: req.title,
            year: new Date().getFullYear(),
            genres: [req.genres],
            cast: [req.cast],
            fullplot: req.fullplot,
            poster: req.poster
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
                    res(err, result);
                    client.close();
                });
        });
    }
};