
var redis = require("redis");



module.exports = bootRedis;



function bootRedis(conf) {

  this.redis = redis;

  this.redisCreateClient = redis.createClient.bind(
    redis, conf.port || conf.socket, conf.host, conf.options);

  this.redisClient = this.redisCreateClient();

  return true;
};
