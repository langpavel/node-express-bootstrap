
var express = require('express');



var app = module.exports = exports = express();



require('../bootstrap')(app);



require('./routes')(app);
