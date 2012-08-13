
var path = require('path');
var util = require('util');
var async = require('async');
var express = require('express');

var DEBUG = require('debug');
var debug = DEBUG('application:bootstrap');
var colors = require('colors');

module.exports = bootstrap;



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

  var conf = {};
  var rootconf = configuration[name] || {};
  var envconf = configuration[env+':'+name] || {};
  var routeconf = configuration[name+'@'+route] || {};
  var envrouteconf = configuration[env+':'+name+'@'+route] || {};

  envconf.__proto__ = rootconf;
  routeconf.__proto__ = envconf;
  envrouteconf.__proto__ = routeconf;

  for(var key in envrouteconf) {
    conf[key] = envrouteconf[key];
  }
  conf.route = route;

  if(conf.enabled === false) {
    debug('Skipping disabled ' + (DEBUG.colored ? what.bold.red : what));
  }

  if(debug.enabled)
    debug('Loading ' + (DEBUG.colored ? what.bold : what) + 
      ':\n  ' + util.inspect(conf, false, 6, DEBUG.colored).replace(/\n/g,'\n  '));

  var initializer = require('./' + name);

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



function bootstrap(app) {
  if(!app) {
    app = express();
    app.express = express;
  }

  app.modules = app.modules || {};

  app.resolveAppPath = app.resolveAppPath || path.resolve.bind(path, __dirname, '../..');

  var env = app.get('env');
  var configuration = require('../../conf');

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
