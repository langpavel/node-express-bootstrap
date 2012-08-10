
var express = require('express');
var redis = require("redis");
var stylus = require("stylus");
var nib = require("nib");



module.exports = exports = function bootstrapBefore(app) {

  var CONF = app.configuration;

  app.RedisStore = require('connect-redis')(express);

  app.redisCreateClient = redis.createClient.bind(
    redis, CONF.redis.port || CONF.redis.socket, CONF.redis.host, CONF.redis.options);

  app.redisClient = app.redisCreateClient();



  (function() {
    var opts = CONF.application.options;
    var val;
    for(var opt in opts) {
      app.set(opt, opts[opt]);
    }
  }());

  app.locals(CONF.application.locals);


  app.use(express.responseTime());

  app.use(express.favicon(CONF.favicon));

  app.use(express.methodOverride(CONF.methodOverride));

  app.use(express.logger(CONF.logger));

  app.use(express.bodyParser());

  app.use(express.cookieParser(CONF.secret.cookie));

  CONF.session.redisStore.client = app.redisClient;
  app.use(express.session({
    store: new app.RedisStore(CONF.session.redisStore)
  }))

  app.use(express.csrf());

  require('./everyauth')(app);

  app.use(app.router);


  // Stylus and nib CSS preprocessor
  CONF.stylus.compile = function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
  app.use(CONF.stylus.url || '/stylesheets', stylus.middleware(CONF.stylus));


  // static files serving
  app.use(express.static(CONF.static));
};
