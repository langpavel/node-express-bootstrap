
module.exports = bootStatic;



function bootStatic(conf) {
  conf.root = this.resolveAppPath(conf.root || './public', '.' + conf.route);

  return this.express.static(conf.root, conf);
}
