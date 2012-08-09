
// APP and CONF are global variables

var express = require('express');
var redis = require("redis");
var stylus = require("stylus");
var nib = require("nib");



APP.RedisStore = require('connect-redis')(express);

APP.redisCreateClient = redis.createClient.bind(
  redis, CONF.redis.port || CONF.redis.socket, CONF.redis.host, CONF.redis.options);

APP.redisClient = APP.redisCreateClient();



(function() {
  var opts = CONF.application.options;
  var val;
  for(var opt in opts) {
    APP.set(opt, opts[opt]);
  }
}());

APP.locals(CONF.application.locals);


APP.use(express.responseTime());

APP.use(express.favicon(CONF.favicon));

APP.use(express.methodOverride(CONF.methodOverride));

APP.use(express.logger(CONF.logger));

APP.use(express.bodyParser());

APP.use(express.cookieParser(CONF.secret.cookie));

CONF.session.redisStore.client = APP.redisClient;
APP.use(express.session({
  store: new APP.RedisStore(CONF.session.redisStore)
}))

APP.use(express.csrf());

APP.use(APP.router);


// Stylus and nib CSS preprocessor
CONF.stylus.compile = function(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}
APP.use(CONF.stylus.url || '/stylesheets', stylus.middleware(CONF.stylus));


// static files serving
APP.use(express.static(CONF.static));
