
// SERVER and CONF are global variables

var express = require('express');
var redis = require("redis");
var stylus = require("stylus");
var nib = require("nib");



SERVER.RedisStore = require('connect-redis')(express);

SERVER.redisCreateClient = redis.createClient.bind(
  redis, CONF.redis.port || CONF.redis.socket, CONF.redis.host, CONF.redis.options);

SERVER.redisClient = SERVER.redisCreateClient();



(function() {
  var opts = CONF.server.options;
  var val;
  for(var opt in opts) {
    SERVER.set(opt, opts[opt]);
  }
}());


SERVER.use(express.responseTime());

SERVER.use(express.favicon(CONF.favicon));

SERVER.use(express.methodOverride(CONF.methodOverride));

SERVER.use(express.logger(CONF.logger));

SERVER.use(express.bodyParser());

SERVER.use(express.cookieParser(CONF.secret.cookie));

CONF.session.redisStore.client = SERVER.redisClient;
SERVER.use(express.session({
  store: new SERVER.RedisStore(CONF.session.redisStore)
}))

SERVER.use(express.csrf());

SERVER.use(SERVER.router);


// Stylus and nib CSS preprocessor
CONF.stylus.compile = function(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}
SERVER.use(CONF.stylus.url || '/stylesheets', stylus.middleware(CONF.stylus));


// static files serving
SERVER.use(express.static(CONF.static));
