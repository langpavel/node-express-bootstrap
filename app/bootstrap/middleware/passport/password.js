
var passportLocal = require('passport-local');



module.exports = bootPassportPassword;



function bootPassportPassword(conf) {
  var passport = this.modules.passport;

  if(!passport)
    throw new Error('Bootstrap `passport` prior submodule');

  passport.use(new passportLocal.Strategy(conf,
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Unknown user' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      });
    }
  ));

  return true;
}
