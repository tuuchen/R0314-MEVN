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
app.get('/api/guestbook/', (req, res) => {
    fs.readFile('./guestbook.json', (err, data) => {
        if (err) throw err;
        let obj = JSON.parse(data);
        res.send(obj);
    });
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
            fs.readFile('./guestbook.json', (err, data) => {
                if (err) throw err;
                res.send(data);
            });
        });
    });
});

// Send submitted form back to frontend
app.post('/api/ajax/', (req, res) => {
    let data = req.body
    res.send(data)
});

// Delete data from json by ID and return new data
app.delete('/api/delete/:id', (req, res) => {
    fs.readFile('./guestbook.json', (err, data) => {
        if (err) throw err;
        let id = req.params.id
        let obj = JSON.parse(data);
        obj = obj.filter((obj) => { return obj.id !== id });
        let newObj = JSON.stringify(obj);
        fs.writeFile('./guestbook.json', newObj, (err) => {
            if (err) throw err;
            fs.readFile('./guestbook.json', (err, data) => {
                if (err) throw err;
                res.send(data);
            });
        });
    });
});

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);