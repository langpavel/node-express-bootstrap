
var redis = require("redis");



module.exports = bootRedis;



function bootRedis(app) {

  var conf = app.configuration.redis;

  app.redis = redis;


  app.redisCreateClient = redis.createClient.bind(
    redis, conf.port || conf.socket, conf.host, conf.options);

  app.redisClient = app.redisCreateClient();

};
