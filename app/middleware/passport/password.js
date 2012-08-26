
var passportLocal = require('passport-local');



module.exports = bootPassportPassword;



function bootPassportPassword(conf) {
  var passport = this.modules.passport;

  if(!passport)
    throw new Error('Do bootstrap `passport` prior submodule (password)');

  var findUserFunction = this.model.user.findByUsernameAndVerify.bind(this.model.user);

  passport.use(new passportLocal.Strategy(
    conf.strategy || {},
    findUserFunction));

  if(conf.template) {
    this.get(conf.route, function(req, res, next){
      res.render(conf.template);
    });
  }

  this.post(conf.route,
    passport.authenticate('local', conf.handler || {})
  );

  return true;
}
