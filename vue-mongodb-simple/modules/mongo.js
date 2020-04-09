module.exports = {
    getData: function (query, callback) {

        const MongoClient = require("mongodb").MongoClient;
        const client = new MongoClient(process.env.MONGO_URI, {
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
                .limit(6000)
                .toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    callback(err, result);
                    client.close();
                });
        });
    },
    postData: function (query, callback) {

        const MongoClient = require("mongodb").MongoClient;
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        var newMovie = {
            title: query.title,
            year: new Date().getFullYear(),
            genres: [query.genres],
            cast: [query.cast],
            fullplot: query.fullplot,
            poster: query.poster
        };

        client.connect(err => {
            const collection = client.db("sample_mflix").collection("movies");
            if (err) throw err;

            collection.insertOne(newMovie, function (err, r) {
                console.log(r.insertedCount || err);
                if (err) throw err;
                let data = [r.ops[0]]
                callback(err, data);
                client.close();
            })
        });
    }
};