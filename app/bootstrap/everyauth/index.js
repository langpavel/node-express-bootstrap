
var everyauth = require('everyauth');



module.exports = function bootstrapEveryauth(app) {
  //expose everyauth module into application
  app.everyauth = everyauth;

  var user_prefix = app.configuration.model.user;

  everyauth.everymodule.findUserById(function(userId, callback) {
    app.redisClient.hgetall(user_prefix + userId, callback);
  });

  require('./password')(app);

  app.use(everyauth.middleware(app));

};
