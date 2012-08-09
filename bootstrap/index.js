
var path = require('path');


// load global CONF
DEBUG('Loading conf.json');
GLOBAL.CONF = require('../conf.json');



CONF.static = path.resolve(__dirname, '..', CONF.static || './public');

CONF.favicon = path.resolve(CONF.static, CONF.favicon || 'favicon.ico');

CONF.application.views = path.resolve(__dirname, '..', CONF.application.views || './views');

CONF.stylus.src = path.resolve(__dirname, '..', CONF.stylus.src || './public/stylesheets');

CONF.stylus.dest = path.resolve(__dirname, '..', CONF.stylus.dest || CONF.stylus.src);



DEBUG('Common configuration - before');
require('./before');


// require 'production' or 'development' based on NODE_ENV
var env = GLOBAL.APP.get('env');
DEBUG('Environment configuration: ' + env);
require('./' + env);


DEBUG('Common configuration - after');
require('./after');


DEBUG('Configuration loaded');
