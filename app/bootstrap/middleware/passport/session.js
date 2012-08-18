
module.exports = bootPassportSession;



function bootPassportSession(conf) {
  var passport = this.modules.passport;

  if(!passport)
    throw new Error('Bootstrap `passport` prior submodule');

  return passport.session(conf);
}
