
GLOBAL.DEBUG = require('debug')('application:global');
GLOBAL.DEBUG('Boot at ' + (new Date).toISOString());

// use node application domains
var domain = require('domain');



var express = require('express');



GLOBAL.SERVER = express();



require('./bootstrap');
