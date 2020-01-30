const http = require("http");
const port = 8080;

http.createServer((request, response) => {

    if (request.url === "/helloworld") {
        // Send the HTTP header. HTTP Status: 200 = OK
        // Content Type: text/plain
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        // Tuukka message
        response.write('Tuukka\'s message!\n\n');
        // Send the response body as "Hello World"
        response.end('Hello World');
    }

    else if (request.url === "/") {
        // Send the HTTP header. HTTP Status: 200 = OK
        // Content Type: text/plain
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        // Tuukka message
        response.write('ASD\'s message!\n\n');
        // Send the response body as "Hello World"
        response.end('Hello ROUTES!');
    }

}).listen(port);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080');