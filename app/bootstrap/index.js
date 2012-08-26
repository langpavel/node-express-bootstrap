
var path = require('path');
var util = require('util');
var async = require('async');
var express = require('express');

var DEBUG = require('debug');
var debug = DEBUG('application:bootstrap');
var colors = require('colors');

module.exports = bootstrap;


/**
 * Chain prototypes, last item properties wins.
 * return last passed object
 */
function chainPrototypes() {
  return Array.prototype.reduce.call(arguments, function(prev, curr) {
    if(!prev) return curr;
    if(!curr) return prev;
    if(prev === curr) return curr;
    curr.__proto__ = prev;
    return curr;
  });
}


// matches ENV:NAME@ROUTE pattern
var pattern = /^(?:(sync|async)!)?(?:([^:@]+):)?([^@]+)(?:@(.+))?$/;

function boot(appEnv, configuration, what, callback) {
  // this means application

  var syncMode, env, name, route;
  var app = this; // bring it to closure

  var match = pattern.exec(what);
  if(match) {
    syncMode = match[1];
    env = match[2];
    name = match[3];
    route = match[4];
  } else {
    throw new Error('Invalid bootstrap argument: '+what);
  }

  if(env && (env.toLowerCase() !== appEnv)) {
    debug('Skipping ' + what + ' in ' + appEnv + ' mode');
    return false;
  }
  env = appEnv;
  route = route || '/';

  var _conf = chainPrototypes(
    configuration[name], // root
    configuration[env+':'+name], // environment
    configuration[name+'@'+route], // route
    configuration[env+':'+name+'@'+route], // environment route
    {}
  );

  if(_conf.enabled === false) {
    debug('Skipping disabled ' + (DEBUG.colored ? what.bold.red : what));
    return callback(null);
  }

  // do not chain prototypes here, copy instead
  var conf = {};
  for(var key in _conf) {
    conf[key] = _conf[key];
  }
  conf.route = route;

  var initializer = require('../' + name);

  if(initializer.configure) {
    debug('Configuring ' + (DEBUG.colored ? what.bold : what));

    conf = initializer.configure.call(app, conf);
    if(typeof conf === 'undefined')
      return callback(new Error('configure method must return configuration: at '+what));

    if(conf.enabled === false) {
      debug('Skipping ' + (DEBUG.colored ? what.bold.red : what) + ' disabled by configuration');
      return callback(null);
    }
  }

  if(debug.enabled)
    debug('Loading ' + (DEBUG.colored ? what.bold : what) + 
      ':\n  ' + util.inspect(conf, false, 6, DEBUG.colored).replace(/\n/g,'\n  '));

  var long_reporter = null;

  var cb = function(err, result) {
    if(long_reporter !== null)
      clearInterval(long_reporter);

    if(err) {
      debug('ERROR: Loading of ' + (DEBUG.colored ? what.bold : what));
      return callback(err);
    }

    if(typeof result === 'undefined' && err === false)
      throw new Error('Initializer `'+ name +'` has no return value.\n'+
        'Do:\n'+
        ' * return true\n'+
        ' * retrun express middleware'+
        ' * return callback provided as second argument to flag async,\n'+
        '   call it with null and opt express MW)\n');

    if(result !== true && result)
      app.use(route, result);

    if(syncMode !== 'async')
      callback(null);
  };

  var result = initializer.call(this, conf, cb);

  if(result === cb) {
    if(debug.enabled)
      long_reporter = setInterval(debug.bind(null, 'Pending initializer '+
        (DEBUG.colored ? what.bold.red : what)), 5000);

    if(syncMode === 'async')
      callback(null);

    return;
  }

  cb(false, result);
};



function tryLoadConf(what) {
  what = path.resolve(__dirname, what);
  debug('Loading \''+what+'\'...');
  try {
    return require(what);
  } catch(err) {
    if(err.code === 'MODULE_NOT_FOUND') {
      debug('WARNING \''+what+'\': file does not exists');
      return;
    }
    debug('ERROR \''+what+'\': '+err);
    throw err;
  }
}



function bootstrap(app) {
  if(!app) {
    app = express();
    app.express = express;
  }

  app.modules = app.modules || {};

  app.resolveAppPath = app.resolveAppPath || path.resolve.bind(path, __dirname, '../..');

  var env = app.get('env');

  var configuration = chainPrototypes(
    tryLoadConf('../../conf.app.json'),
    tryLoadConf('../../conf.json'),
    {}
  );

  async.mapSeries(
    configuration.bootstrap, 
    boot.bind(app, env, configuration), 
    function(err, results) {
      if(err) {
        debug('Bootstrap failed!');
        throw err;
      }
      debug('Configuration loaded');
      app.emit('boot');
    }
  );

};
