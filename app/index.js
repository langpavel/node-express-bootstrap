
var express = require('express');



var app = module.exports = exports = express();

app.express = express;

require('./bootstrap')(app);

require('./routes')(app);

