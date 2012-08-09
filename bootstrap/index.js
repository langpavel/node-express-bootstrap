

var debug = require('debug')('application:bootstrap');
var path = require('path');



module.exports = function bootstrap(app) {
  debug('Loading conf.json');
  var conf = app.configuration = require('../conf.json');


  conf.static = path.resolve(__dirname, '..', conf.static || './public');

  conf.favicon = path.resolve(conf.static, conf.favicon || 'favicon.ico');

  conf.application.views = path.resolve(__dirname, '..', conf.application.views || './views');

  conf.stylus.src = path.resolve(__dirname, '..', conf.stylus.src || './public/stylesheets');

  conf.stylus.dest = path.resolve(__dirname, '..', conf.stylus.dest || conf.stylus.src);



  debug('Common configuration - before');
  require('./before')(app);


  // require 'production' or 'development' based on NODE_ENV
  var env = app.get('env');
  debug('Environment configuration: ' + env);
  require('./' + env)(app);


  debug('Common configuration - after');
  require('./after')(app);


  debug('Configuration loaded');
};
