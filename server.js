
require('better-inspect');

debug = require('debug')('application:server');
debug('Boot at ' + (new Date).toISOString());

// use node application domains
var domain = require('domain');
var http = require('http');



var app = require('./app');



var server = module.exports = http.createServer(app);
server.app = app;

var conf = app.configuration.server;


server.listen.apply(server, conf.listen);
debug("Server listening: " + conf.listen);
