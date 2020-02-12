var fs = require("fs");

console.log("Program started");

/* When sync -methods are used, they go synchronously trough the code, quote: 
"When you execute something synchronously, you wait for it to finish before moving on to another task." */

// Create some files

fs.writeFileSync('file-one.txt', 'I wrote this!', (err) => {
    if (err) throw err;
    console.log('File one is here!');
});

fs.writeFileSync('file-two.txt', 'I also wrote this!', (err) => {
    if (err) throw err;
    console.log('File two is here');
});

// Delete the first one
fs.unlinkSync('file-one.txt', (err) => {
    if (err) throw err;
    console.log('file-one.txt was deleted');
});

/* Without Sync, the methods are asynchronous and the code is moving to another block before waiting it to finish, quote:
When you execute something asynchronously, you can move on to another task before it finishes. */

// Create some files

fs.writeFile('my-first-file.txt', 'I wrote this!', (err) => {
    if (err) throw err;
    console.log('File one is here!');
});

fs.writeFile('my-second-file.txt', 'I also wrote this!', (err) => {
    if (err) throw err;
    console.log('File two is here');
});

// Delete the first one
fs.unlink('my-first-file.txt', (err) => {
    if (err) throw err;
    console.log('my-first-file was deleted');
});

console.log("Program ended!");