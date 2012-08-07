
var app = GLOBAL.SERVER;

DEBUG('Loading conf.json');
GLOBAL.CONF = require('../conf.json');


DEBUG('Common configuration - before');
require('./before');


// require 'production' or 'development' based on NODE_ENV
var env = app.get('env');
DEBUG('Environment configuration: ' + env);
require('./on/' + env);


DEBUG('Common configuration - after');
require('./after');


DEBUG('Configuration loaded');
