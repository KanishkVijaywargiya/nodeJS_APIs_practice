const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// hostName
const hostName = '127.0.0.1';
// portNumber           //for setting in heroku.
const port = 5000;      //app.set('port', process.env.PORT || 8080);

// the files what we are supporting on our servers.
const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
};

http.createServer((req, res) => {
    // for setting the path of the file 
    var myuri = url.parse(req.url).pathname
    // The process.cwd() method returns the current working directory of the Node.js process.
    var filename = path.join(process.cwd(), unescape(myuri));
    console.log('File you are looking for is:: ' + filename);
    // for loading up the file
    var loadFile;
    // if the file is not present in the filesystem then the server will crash or anything unusual happens. So we use try{}Catch{} error handle method.
    try {
        loadFile = fs.lstatSync(filename)
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 page not found');
        res.end();
        return;
    }
    // this is the case with the files.
    if (loadFile.isFile()) {
        // eg:: myfile.html.png     
        //so by using reverse()[0]    
        //order will be png.html.myfile   
        //so final extension name (extname) is png
        var mimeType =
            mimeTypes[
            path
                .extname(filename)
                .split('.')
                .reverse()[0]
            ];
        res.writeHead(200, { 'Content-Type': mimeType });
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    }
    // now case with the directories
    else if (loadFile.isDirectory()) {
        res.writeHead(302, { 'Location': 'index.html' });
        res.end();
    }
    // if it is neither file nor directory
    else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('500 internal Error');
        res.end();
    }
}).listen(port, hostName, () => {
    console.log(`Server is running at http://${hostName}:${port}/`);
})

// response codes
// 200  ->  OK
// 302  ->  Directories
// 404  ->  Error
// 500  ->  generic error response status code