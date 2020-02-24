const http = require("http");
const fs = require("fs");
const port = 8080;

// Create server
http.createServer((req, res) => {

    // Default url
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.write(returnJson());
        res.end();
    }

    // All unkown routes takes the user back to default page
    else {
        res.writeHead(302, { 'Location': '/' });
        res.end();
    }

}).listen(port);

// Output server location to console
console.log('Server running at http://127.0.0.1:' + port);

function logJson () {

    // Log first json.
    const obj = require('./data.json');
    console.log("First task:")
    console.log(obj);
}

function createJson () {

    // Add new data
    let data = fs.readFileSync('./data.json');
    data = JSON.parse(data);
    data.push({
        "Name": "John Doe",
        "age": "52",
        "company": "Laurea",
        "address": "Ratatie 22",
    });
    fs.writeFileSync('./dataset.json', JSON.stringify(data));
    // And output to console
    let newData = fs.readFileSync('./dataset.json');
    newData = JSON.parse(newData);
    console.log("Second task:")
    console.log(newData)
}

function deleteJson () {

    // Remove data with "Name: Flynn Coleman"
    const removeUser = "Flynn Coleman";
    let data = fs.readFileSync('./dataset.json');
    let json = JSON.parse(data);
    json = json.filter((json) => { return json.name !== removeUser });
    // Write data to new file
    fs.writeFileSync('./results.json', JSON.stringify(json, null, 2));
    // And output results to console
    let results = fs.readFileSync('./results.json');
    results = JSON.parse(results);
    console.log("Third task:")
    console.log(results)
    // Return results as a return value
    return results

}

function returnJson () {

    // Handle functions
    logJson();
    createJson();
    // And pass third task to be handled by res.write, as asked. 
    return (JSON.stringify(deleteJson()));
}




