var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/pokedex');

require('./models/Pokemon');
require('./models/Type');

var app = express();

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemon'));
app.use('/type', require('./routes/type'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Application Pokédex lancé !')
app.listen(3000);