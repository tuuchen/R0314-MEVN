var fs = require("fs");

console.log("Program started");

// Combine two file contents into one

// Read frist and second files and store them into variable
var data = fs.readFileSync('first.txt');
data += ' ' + fs.readFileSync('second.txt');

// Write "I wrote this!" to the beginning and the end of file

// Start with "I wrote this!"
fs.writeFileSync('third.txt', 'I wrote this! ');

// Append first.txt and second.txt after the text that has already been written to third.txt
fs.appendFileSync('third.txt', data);

// And add "I wrote this!" to the end
fs.appendFileSync('third.txt', ' I wrote this!');

// Output result
data = fs.readFileSync('third.txt');
console.log(data.toString());

console.log("Program ended");