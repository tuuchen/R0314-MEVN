module.exports = {
    getData: function (req, res) {

        const MongoClient = require("mongodb").MongoClient;
        const client = new MongoClient(process.env.MONGO_URI, {
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
                    console.log(result);
                    res(err, result);
                    client.close();
                });
        });
    },
    postData: function (req, res) {

        const MongoClient = require("mongodb").MongoClient;
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

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
                console.log(r.insertedCount || err);
                if (err) throw err;
                let data = [r.ops[0]]
                res(err, data);
                client.close();
            })
        });
    }
};