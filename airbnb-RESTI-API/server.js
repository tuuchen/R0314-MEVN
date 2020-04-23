const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./modules/routes');
const app = express();
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

/* I don't really need more paths at the moment
because I can construct functionality with route queries etc. */

// Get data 
app.get('/api/query/', routes);
// Get by ID
app.get('/api/id/', routes);
// Add
app.post('/api/add', routes);
// Edit
app.put('/api/edit', routes);
// Delete
app.delete('/api/delete/', routes);
// Unkown URL / error handling
app.get(/.*/, routes);

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
