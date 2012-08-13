
var connectRedis = require('connect-redis');



module.exports = bootRedisSessionStore;



function bootRedisSessionStore(conf) {
  this.RedisStore = connectRedis(this.express);

  conf.client = this.redisClient;

  this.sessionStore = new this.RedisStore(conf);

  return true;
};
