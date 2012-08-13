
var everyauth = require('everyauth');

var debug = require('debug')('application:bootstrap');



module.exports = function bootstrapEveryauth(conf) {
  //expose everyauth module into application
  this.everyauth = everyauth;

  var user_prefix = conf.user_prefix;

  for(var key in conf) {
    var cf = everyauth.everymodule[key];
    if(cf && typeof cf === 'function') {
      cf.call(everyauth.everymodule, conf[key]);
    } else {
      debug('everyauth')
    }
  }

  everyauth.everymodule.findUserById(function(userId, callback) {
    app.redisClient.hgetall(user_prefix + userId, callback);
  });

  return everyauth.middleware(this);

};
