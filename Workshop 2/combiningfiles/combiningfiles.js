var fs = require("fs");

console.log("Program started");

// Combine two file contents into one

// Read frist and second files and store them into variable
var data = fs.readFileSync('first.txt');
data += ' ' + fs.readFileSync('second.txt');

// Write "I wrote this to the beginning and the end of file"
fs.writeFileSync('third.txt', 'I wrote this! ');

// Append data to the middle
fs.appendFileSync('third.txt', data);

// And to end
fs.appendFileSync('third.txt', ' I wrote this!');

// Output result
data = fs.readFileSync('third.txt');
console.log(data.toString());

console.log("Program ended");