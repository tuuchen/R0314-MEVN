var fs = require('fs');

path = '../'
fs.readdir(path, (err, data) => {
    if (err) throw err;
    console.log(data);
});