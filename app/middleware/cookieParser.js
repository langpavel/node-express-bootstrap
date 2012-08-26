
module.exports = bootCookieParser;



function bootCookieParser(conf) {
  return this.express.cookieParser(bootCookieParser.secret);
}



bootCookieParser.configure = function(conf) {
  bootCookieParser.secret = conf.secret;
  delete conf.secret;
  return conf;
};
