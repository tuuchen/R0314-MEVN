// Require http, file system, and define port for server
const http = require("http");
const fs = require("fs")
const port = 8080;

// Create server
http.createServer((req, res) => {

    // Default url
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Nothing to see here');
        res.end();
    }

    // /google redirects to Google
    else if (req.url === "/google") {
        res.writeHead(302, { 'Location': 'https://ww.google.com' });
        res.end();
    }

    // /frontpage outputs the html contents of "myPage"
    else if (req.url === "/frontpage") {
        res.writeHead(200, { 'Content-Type': 'html' });
        res.write(myPage);
        res.end();
    }

    // /contact outputs the html contents of "contact"
    else if (req.url === "/contact") {
        res.writeHead(200, { 'Content-Type': 'html' });
        res.write(contact);
        res.end();
    }

    // /foo outputs the contents of a text file, or creates and and outputs the contents
    // Here we do the operation as a try/catch/finally block
    else if (req.url === "/foo") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        try {
            var data = fs.readFileSync(path);
        } catch {
            fs.writeFileSync(path, 'Hello World!');
            var data = fs.readFileSync(path);
        } finally {
            res.write(data);
            res.end();
        }
    }

    // /bar outputs the contents of a text file, or creates and and outputs the contents
    // Here we approach more traditional way with if/else statement
    else if (req.url === "/bar") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (fs.existsSync(path)) {
            var data = fs.readFileSync(path);
            res.write(data);
            res.end();
        } else {
            fs.writeFileSync(path, 'Hello World!');
            var data = fs.readFileSync(path);
            res.write(data);
            res.end();
        }
    }

    // /json reads contents of a json file and outputs the contents
    else if (req.url === "/json") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('./data.json');
        res.write(data);
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

// Define path for text-file
const path = './HelloWorld.txt'

// Define contents of HTML-file
const myPage = `<!DOCTYPE html>
<html lang="en">
<head>
<title>Page Title</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

/* Style the body */
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

/* Header/logo Title */
.header {
  padding: 80px;
  text-align: center;
  background: #1abc9c;
  color: white;
}

/* Increase the font size of the heading */
.header h1 {
  font-size: 40px;
}

/* Sticky navbar - toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed). The sticky value is not supported in IE or Edge 15 and earlier versions. However, for these versions the navbar will inherit default position */
.navbar {
  overflow: hidden;
  background-color: #333;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

/* Style the navigation bar links */
.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}


/* Right-aligned link */
.navbar a.right {
  float: right;
}

/* Change color on hover */
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/* Active/current link */
.navbar a.active {
  background-color: #666;
  color: white;
}

/* Column container */
.row {  
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}

/* Create two unequal columns that sits next to each other */
/* Sidebar/left column */
.side {
  -ms-flex: 30%; /* IE10 */
  flex: 30%;
  background-color: #f1f1f1;
  padding: 20px;
}

/* Main column */
.main {   
  -ms-flex: 70%; /* IE10 */
  flex: 70%;
  background-color: white;
  padding: 20px;
}

/* Fake image, just for this example */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
}

/* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 700px) {
  .row {   
    flex-direction: column;
  }
}

/* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
@media screen and (max-width: 400px) {
  .navbar a {
    float: none;
    width: 100%;
  }
}
</style>
</head>
<body>

<div class="header">
  <h1>My Website</h1>
  <p>A <b>responsive</b> website created by me.</p>
</div>

<div class="navbar">
  <a href="#" class="active">Home</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#" class="right">Link</a>
</div>

<div class="row">
  <div class="side">
    <h2>About Me</h2>
    <h5>Photo of me:</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    <h3>More Text</h3>
    <p>Lorem ipsum dolor sit ame.</p>
    <div class="fakeimg" style="height:60px;">Image</div><br>
    <div class="fakeimg" style="height:60px;">Image</div><br>
    <div class="fakeimg" style="height:60px;">Image</div>
  </div>
  <div class="main">
    <h2>TITLE HEADING</h2>
    <h5>Title description, Dec 7, 2017</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <br>
    <h2>TITLE HEADING</h2>
    <h5>Title description, Sep 2, 2017</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
  </div>
</div>

<div class="footer">
  <h2>Footer</h2>
</div>

</body>
</html>`;

// Define contents of HTML-form
const contact = `<form>
<h3>Contact form</h3>
 <h4>Please fill in with your info </h4>
<div class="footerFormR">
 <p><label>Name*:</label><input name="Name" type="text" class="footerInputArea" /></p>
 <p><label>Email*:</label><input name="Email" type="text" class="footerInputArea" /></p>
 <p><label>Phone Number:</label><input name="Number" type="text" class="footerInputArea" /></p>

</form>`