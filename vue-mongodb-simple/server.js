const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/src')));

app.get('/api/search/:title', (req, res) => {
    let title = req.params.title
    getResult(title, function (err, result) {
        res.send(result)
    });
});

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

function getResult (query, callback) {
    const MongoClient = require("mongodb").MongoClient;
    // URI hidden in Heroku
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    var query = {
        title: new RegExp(query, 'i')
    };

    client.connect(err => {
        // console.log(query)
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
            });
    });
}

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
