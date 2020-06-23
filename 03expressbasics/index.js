const express = require('express');
const app = express();

// .get() route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('<h1>I am about page</h1>');
});
app.get('/contactus', (req, res) => {
    res.send('<h3><strong>Contact Number::  +91-9123235319</strong></h3> <br> <h3><strong>Email::  kanishkvijaywargiya99@gmail.com<h3><strong>')
});
app.get('/services', (req, res) => {
    res.send(
        '<ul><li>App Development</li> <li>Video making</li> <li>Food Making</li> </ul>'
    )
});
app.get('/users/:id/status/:status_id', (req, res) => {
    res.send(req.params);
});
app.get('/flights/:from-:to/', (req, res) => {
    res.send(req.params);
});
app.get('/json', (req, res) => {
    res.json({ user: 'Kanishk', balance: 2000, id: '123ffght56' })
});
app.get('/statuscode', (req, res) => {
    res.status(404).json({ user: 'Kanishk', balance: 2000, id: 'eefght' })
});



// .post() route
app.post('/login', (req, res) => {
    res.send('login Success');
});

// .delete() route
app.delete('/login', (req, res) => {
    res.send('Delete Success');
})


app.listen(3000, () => console.log('Server is running at port 3000...'))