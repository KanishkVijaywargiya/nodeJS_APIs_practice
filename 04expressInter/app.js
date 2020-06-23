const express = require('express');
const app = express();

// MIDDLEWARE
var myconsolelog = function (req, res, next) {
    console.log('I am a middleware');
    next();
};
app.use(myconsolelog);

var servertime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
}
app.use(servertime);

// .get() route
app.get('/', (req, res) => {
    res.send('Hello World!' + ' and time is:: ' + req.requestTime);
    res.send('Hello World from /')
});

app.listen(3000, () => console.log('Server is running at port 3000...'))