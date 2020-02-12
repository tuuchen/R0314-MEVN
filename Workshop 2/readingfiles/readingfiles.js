var fs = require("fs");

console.log("Program started");

// Read two txt-files and add them to variable
var data = fs.readFileSync('first.txt');
data += '\n' + fs.readFileSync('second.txt')
// Output result
console.log(data.toString());

console.log("Program ended");