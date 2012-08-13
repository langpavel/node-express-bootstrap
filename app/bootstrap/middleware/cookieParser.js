
module.exports = bootCookieParser;



function bootCookieParser(conf) {
  // secure secret
  var secret = conf.secret;
  delete conf.secret;
  
  return this.express.cookieParser(secret);
}
