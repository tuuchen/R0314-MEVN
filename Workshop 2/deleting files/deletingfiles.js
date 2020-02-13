var fs = require("fs");

console.log("Program started");

/* When sync -methods are used, they go synchronously trough the code, quote: 
"When you execute something synchronously, you wait for it to finish before moving on to another task." */

// Create some files

fs.writeFileSync('first-sync-file.txt', 'I wrote this!');
console.log('Sync: My first sync file is here!');

fs.writeFileSync('second-sync-file.txt', 'I also wrote this!');
console.log('Sync: My second sync file is here!');

// Delete the first one
fs.unlinkSync('second-sync-file.txt');
console.log('Sync: first sync file was deleted!');

/* Without Sync, the methods are asynchronous and the code is moving to another block before waiting it to finish, quote:
When you execute something asynchronously, you can move on to another task before it finishes. */

// Create some files

fs.writeFile('first-async-file.txt', 'I wrote this!', (err) => {
    if (err) throw err;
    console.log('Async: My first async file is here!');
});

fs.writeFile('second-async-file.txt', 'I also wrote this!', (err) => {
    if (err) throw err;
    console.log('Async: My second async file is here!');
});

// Delete the first one
fs.unlink('first-async-file.txt', (err) => {
    if (err) throw err;
    console.log('Async: My first async was deleted');
});

console.log("Program ended!");