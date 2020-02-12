var fs = require("fs");

// Synchronous

console.log("Program started");

var data = fs.readFileSync('test.txt');
console.log(data.toString());

for (var i = 0; i < 15; i++) {
    console.log("Node just keeps on going while the file is being read..");
}

console.log("Program ended");