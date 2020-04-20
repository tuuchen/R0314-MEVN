const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./modules/routes');
const app = express();
app.use(bodyParser.json());

app.get('/api/getall', routes);
// List all with pagenum
app.get('/api/getall/page/:page', routes);
// Search ID
app.get('/api/id/:id', routes);
// Search keyword
app.get('/api/keyword/:keyword/page/:page', routes);
// Add
app.post('/api/add', routes);
// Edit
app.put('/api/edit', routes);
// Delete
app.delete('/api/delete/:id', routes);
// Unkown URL error handling
app.get(/.*/, routes);

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
