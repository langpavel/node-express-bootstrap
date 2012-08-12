
var path = require('path');
var util = require('util');
var DEBUG = require('debug');
var debug = DEBUG('application:bootstrap');



module.exports = bootstrap;



function bootstrap(app) {

  var env = app.get('env');

  app.configuration = require('../../conf');

  app.resolveAppPath = path.resolve.bind(path, __dirname, '../..');

  app.boot = function boot(what) {
    var name = what;
    var i = what.indexOf(':');
    if(i >= 0) {
      name = what.substring(i+1);
      if(what.substring(0, i).toLowerCase() !== env) {
        debug('Skipping ' + what + ' in ' + env + ' mode');
        return false;
      }
    }

    var conf = this.configuration[name] || {};
    var envconf = this.configuration[env+':'+name];
    if(envconf) {
      for(var key in envconf)
        conf[key] = envconf[key];
    }

    if(debug.enabled)
      debug('Loading ' + what + ': ' + util.inspect(conf, false, 4, DEBUG.colored));

    return require('./' + name)(this, conf);
  };

  app.boot('conf');

  app.configuration.bootstrap.forEach(app.boot.bind(app));

  debug('Configuration loaded');
};
