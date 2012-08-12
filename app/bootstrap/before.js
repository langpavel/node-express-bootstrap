
var express = require('express');
var redis = require("redis");
var stylus = require("stylus");
var nib = require("nib");



module.exports = exports = function bootstrapBefore(app) {

  var CONF = app.configuration;


  app.use(express.logger(CONF.logger));

  app.use(express.bodyParser());

  app.use(express.cookieParser(CONF.secret.cookie));

  app.RedisStore = require('connect-redis')(express);
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
