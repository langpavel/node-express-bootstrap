
require('better-inspect');

debug = require('debug')('application:server');
debug('Boot at ' + (new Date).toISOString());

// use node application domains
var domain = require('domain');


var app = require('./app');
