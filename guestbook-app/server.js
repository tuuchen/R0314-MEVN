const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// Load json and send to frontend
app.get('/api/guestbook', (req, res) => {
    let data = fs.readFileSync('./guestbook.json');
    data = JSON.parse(data);
    res.send(data);
});

// Add form data to json
app.post('/api/newmessage/', (req, res) => {
    let data = fs.readFileSync('./guestbook.json');
    data = JSON.parse(data);
    data.push(req.body);
    fs.writeFileSync('./guestbook.json', JSON.stringify(data));
    res.end();
});

// Send form data back to frontend
app.post('/api/ajax/', (req, res) => {
    let data = req.body
    res.send(data)
});

// Delete data from json by ID
app.get('/api/delete/:id', (req, res) => {
    let id = req.params.id
    let data = fs.readFileSync('./guestbook.json');
    let json = JSON.parse(data);
    json = json.filter((json) => { return json.id !== id });
    fs.writeFileSync('./guestbook.json', JSON.stringify(json, null, 2));
    let results = fs.readFileSync('./guestbook.json');
    res.send(results)
});

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
