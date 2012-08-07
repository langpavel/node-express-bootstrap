
var path = require('path');



DEBUG('Loading conf.json');
GLOBAL.CONF = require('../conf.json');



CONF.static = path.resolve(__dirname, '..', CONF.static || './public');

CONF.favicon = path.resolve(CONF.static, CONF.favicon || 'favicon.ico');

CONF.server.views = path.resolve(__dirname, '..', CONF.server.views || './views');
