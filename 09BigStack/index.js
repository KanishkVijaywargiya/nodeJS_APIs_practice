const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// bring all routes
const auth = require('./routes/api/auth.js');
const questions = require('./routes/api/questions.js');
const profile = require('./routes/api/profile.js');

const app = express();

// Middleware for body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

// mongoDB Configuration
const db = require('./setup/MyUrl.js').mongoURL;

// attempt to connect to database
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected successfully'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

// config for jwt strategy
require('./strategies/jsonwtStrategies')(passport);

// just for testing purpose
// @route   -   GET   /home
// @desc    -   a route to home page
// @access  -   PUBLIC  
app.get('/', (req, res) => {
    res.send('Hello Big Stack');
});

// actual functioning routes
// @route   -   GET   /home
// @desc    -   a route to home page
// @access  -   PUBLIC  
app.use('/api/auth', auth);
app.use('/api/questions', questions);
app.use('/api/profile', profile);

app.listen(port, () => console.log(`Server is running at port ${port}...`));

