
module.exports = bootStatic;



function bootStatic(conf) {
  return this.express.static(conf.root, conf);
}



bootStatic.configure = function(conf) {
  conf.root = this.resolveAppPath(conf.root || './public', '.' + conf.route);
  return conf;
};
