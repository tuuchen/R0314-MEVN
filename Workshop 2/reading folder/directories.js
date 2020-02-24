var fs = require("fs");

// Create apple folder
fs.mkdir('./tmp/a/apple', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Apple folder created!');
    // If no err, create apple file
    fs.writeFile('./tmp/a/apple/file.txt', 'I wrote this!', (err) => {
        if (err) throw err;
        // Done!
        console.log('Apple file is here!');
    });
});

// At the same time, create banana folder
fs.mkdir('./tmp/a/banana', { recursive: true }, (err) => {
    if (err) throw err;
    // Done!
    console.log('Banana folder created!');
});

// At the same time, create a melon folder
fs.mkdir('./tmp/a/melon', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Melon folder created..');
    // And remove melon folder
    fs.rmdir('./tmp/a/melon', { recursive: true }, (err) => {
        if (err) throw err;
        // Done!
        console.log('..And deleted! :(');
    });
});