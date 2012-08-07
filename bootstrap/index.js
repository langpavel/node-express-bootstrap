
var app = GLOBAL.SERVER;


// load global CONF
require('./conf');


DEBUG('Common configuration - before');
require('./before');


// require 'production' or 'development' based on NODE_ENV
var env = app.get('env');
DEBUG('Environment configuration: ' + env);
require('./on/' + env);


DEBUG('Common configuration - after');
require('./after');


DEBUG('Configuration loaded');
