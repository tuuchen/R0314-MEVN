const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const routes = require("./modules/routes");
const app = express();
app.use(bodyParser.json());
require('dotenv').config()

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/src')));

// Search for a movie title
app.get('/api/search/:title', routes);

// Add a new movie title
app.post('/api/newmovie/', routes);

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
