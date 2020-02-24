const http = require("http");
const port = 8080;
const path = './data.json'
var obj = require(path);

// Create server
http.createServer((req, res) => {

    // Default url
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'html' });
        res.write(jsonToHtml());
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

// Loop desired json data to html
function jsonToHtml () {

    // Variable for data
    let middle = '';

    // Reverse loop for fun
    for (var i = obj.length; i--;) {
        console.log("Name: " + obj[i].name);
        console.log("Age: " + obj[i].age);
        console.log("Company: " + obj[i].company);
        console.log("Adress: " + obj[i].address + "\n**********");

        middle += `<tr><td>Name: ` + obj[i].name + `</td>
        <td>Age: ` + obj[i].age + `</td>
        <td>Company: ` + obj[i].company + `</td>
        <td>Adress: ` + obj[i].address + `</td></tr>`
    }

    const start = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>Page Title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <table border="1">`;

    const end = `</table></body>
    </html>`;

    // Inject data into html
    return start + middle + end;
}