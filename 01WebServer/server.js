const http = require('http');

// hostName
const hostName = '127.0.0.1';
// portNumber           //for setting in heroku.
const port = 5000;      //app.set('port', process.env.PORT || 8080);

// server creation
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
}).listen(port, hostName, () => {
    console.log(`Server is running at http://${hostName}:${port}/`);
})
// server listening
