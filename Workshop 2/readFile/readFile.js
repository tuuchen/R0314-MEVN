var fs = require("fs");

// Asynchronous

console.log("Program started");

fs.readFile('test.txt', results);

for (var i = 0; i < 15; i++) {
    console.log("Node just keeps on going while the file is being read..");
}

console.log("Program ended");

// Introduce a function to deal with fileread results
function results (err, data) {
    if (err) return console.error(err);
    console.log("Results of fileread:");
    console.log(data.toString());
}