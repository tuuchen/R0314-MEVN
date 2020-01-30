const http = require("http");
const port = 8080;

http.createServer((request, response) => {

    if (request.url === "/helloworld") {
        // Send the HTTP header. HTTP Status: 200 = OK
        // Content Type: text/plain
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        // Message from /helloworld -route
        response.write('ASD\'s message!\n\n');
        response.end('Hello ROUTES!');
    }

    else if (request.url === "/") {
        // Send the HTTP header. HTTP Status: 200 = OK
        // Content Type: text/plain
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        // Tuukka's message
        response.write('Tuukka\'s message!\n\n');
        // Send the response body as "Hello World"
        response.end('Hello World');
    }

}).listen(port);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080');