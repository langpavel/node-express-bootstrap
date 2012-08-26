
module.exports = bootPassportSession;



function bootPassportSession(conf) {
  var passport = this.modules.passport;

  if(!passport)
    throw new Error('Do bootstrap `passport` prior submodule (session)');

  return passport.session(conf);
}
