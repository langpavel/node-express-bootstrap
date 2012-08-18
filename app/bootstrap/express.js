
module.exports = bootExpress;



function bootExpress(conf) {
  for(var key in conf) {
    this.set(key, conf[key]);
  }

  return true;
}



bootExpress.configure = function(conf) {
  conf.views = this.resolveAppPath(conf.views || './app/views');
  return conf;
};
