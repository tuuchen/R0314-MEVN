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
    fs.readFile('./guestbook.json', (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        res.render('pages/guestbook', { data });
    });
});

// Add entry -page
app.get('/newmessage', (req, res) => {
    data = [{ id: '', username: '', country: '', date: '', message: '' }]
    res.render('pages/newmessage', { data });
});

// Add form data to json and return new data
app.post('/api/newmessage/', (req, res) => {
    fs.readFile('./guestbook.json', (err, data) => {
        if (err) throw err;
        let obj = JSON.parse(data);
        obj.push(req.body);
        let newObj = JSON.stringify(obj);
        fs.writeFile('./guestbook.json', newObj, (err) => {
            if (err) throw err;
            data = [req.body];
            res.render('pages/newmessage', { data });
        });
    });
});

// Delete data from json by ID
app.delete('/api/delete/:id', (req, res) => {
    fs.readFile('./guestbook.json', (err, data) => {
        if (err) throw err;
        let id = req.params.id
        let obj = JSON.parse(data);
        obj = obj.filter((obj) => { return obj.id !== id });
        let newObj = JSON.stringify(obj);
        fs.writeFile('./guestbook.json', newObj, (err) => {
            if (err) throw err;
            res.end();
        });
    });
});

// Redirect unkown routes to index
app.get(/.*/, function (req, res) {
    res.render('pages/index');
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);