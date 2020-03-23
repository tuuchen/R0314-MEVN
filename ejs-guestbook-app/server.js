const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Path for serving static files
app.use('/', serveStatic(path.join(__dirname, '/src')));

// Guestbook -page
app.get('/guestbook', (req, res) => {
    let data = fs.readFileSync('./guestbook.json');
    data = JSON.parse(data);
    res.render('pages/guestbook', { data });
});

// Add entry -page
app.get('/newmessage', (req, res) => {
    data = [{ id: '', username: '', country: '', date: '', message: '' }]
    res.render('pages/newmessage', { data });
});

// Add form data to json and return new data
app.post('/api/newmessage/', (req, res) => {
    let guestbook = fs.readFileSync('./guestbook.json');
    guestbook = JSON.parse(guestbook);
    let form = req.body
    guestbook.push(form)
    data = []
    data.push(form)
    fs.writeFileSync('./guestbook.json', JSON.stringify(guestbook));
    res.render('pages/newmessage', { data });
});

// Delete data from json by ID
app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id
    let data = fs.readFileSync('./guestbook.json');
    let json = JSON.parse(data);
    json = json.filter((json) => { return json.id !== id });
    fs.writeFileSync('./guestbook.json', JSON.stringify(json, null, 2));
    res.end();
});

// Redirect unkown routes to index
app.get(/.*/, function (req, res) {
    res.render('pages/index');
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
