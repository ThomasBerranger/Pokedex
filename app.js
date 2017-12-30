var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
    dest: __dirname + '/uploads'
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/pokedex');

require('./models/Pokemon');
require('./models/Type');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemon'));
app.use('/type', require('./routes/type'));

app.use('/upload', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Application Pokédex lancé !')
app.listen(3000);