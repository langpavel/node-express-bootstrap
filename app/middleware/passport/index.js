
var passport = require('passport');



module.exports = bootPassport;



function bootPassport(conf) {
  this.modules.passport = passport;
  return passport.initialize();
}
