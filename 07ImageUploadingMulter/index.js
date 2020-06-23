const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// muter setting
// here cb is callback
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/myUpload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({
    storage: storage
}).single('profilepic');

// setup for ejs
app.set('view engine', 'ejs');

// setup of static folder
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index');
});

// Description for every single routes
app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render('index', {
                message: error
            });
        } else {
            res.render('index', {
                message: 'Successfully uploaded...',
                filename: `myUpload/${req.file.filename}`
            });
        }
    });
});
app.listen(port, () => console.log('Server is running at ${port}...'));