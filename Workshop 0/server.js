var http = require("http");
http.createServer(function (request, response) {

  // Send the HTTP header. HTTP Status: 200 = OK
  // Content Type: text/plain
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // Tuukka message
  response.write('Tuukka\'s message!<br><br>');
  // Table 
  response.write(`
    <table>
  <tr style="color: red";>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
  <td><a href="https://www.google.fi/" target="_blank">Link</a></td>
</tr>
</table>`);
  // Send the response body as "Hello World"
  response.end('<br>Hello World');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081');