
// SERVER and CONF are global variables


var path = require('path');

var express = require('express');
var redis = require("redis");



SERVER.RedisStore = require('connect-redis')(express);

SERVER.redisCreateClient = redis.createClient.bind(redis, CONF.redis.port, CONF.redis.host, CONF.redis.options);


(function() {
  var opts = CONF.server.options;
  var val;
  for(var opt in opts) {
    if(opt === 'views') {
      SERVER.set(opt, path.resolve(__dirname, '../..', opts[opt]));
    } else {
      SERVER.set(opt, opts[opt]);
    }
  }
}());


SERVER.use(express.logger());

SERVER.use(express.bodyParser());

SERVER.use(express.cookieParser(CONF.secret.cookie));

SERVER.use(express.session({
  store: new SERVER.RedisStore(CONF.session.redisStore),
  secret: CONF.secret.session
}))

SERVER.use(SERVER.router);

SERVER.use(express.static(path.resolve(__dirname, '../..', CONF.static || './public')));
