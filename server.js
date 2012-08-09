
GLOBAL.DEBUG = require('debug')('application:global');
GLOBAL.DEBUG('Boot at ' + (new Date).toISOString());

// use node application domains
var domain = require('domain');
var http = require('http');



require('./app');



var server = GLOBAL.SERVER = http.createServer(APP);


server.listen.apply(server, CONF.server.listen);
DEBUG("Server listening: " + CONF.server.listen);
