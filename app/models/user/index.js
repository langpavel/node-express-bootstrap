
var debug = require('debug')('application:model:user');


var redis = SERVER.redisClient;


var prefix = CONF.model.user || 'user:';



exports.get = function(id, callback) {
  debug('model.user.get "'+id+'"');
  redis.hgetall(prefix + id, callback);
};



exports.put = function(user, callback) {
  debug('model.user.get "'+id+'"');
};
