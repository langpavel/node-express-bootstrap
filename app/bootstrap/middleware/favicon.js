
module.exports = bootFavicon;



function bootFavicon(conf) {
  conf.icon = this.resolveAppPath(conf.icon || './public/favicon.ico');
  return this.express.favicon(conf.icon);
}
