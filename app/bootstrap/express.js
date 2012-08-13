
module.exports = bootExpress;



function bootExpress(conf) {

  conf.views = this.resolveAppPath(conf.views || './app/views');

  for(var key in conf) {
    this.set(key, conf[key]);
  }

  return true;
}
