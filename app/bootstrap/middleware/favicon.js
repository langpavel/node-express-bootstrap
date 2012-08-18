
module.exports = bootFavicon;



function bootFavicon(conf) {
  return this.express.favicon(conf.icon);
}



bootFavicon.configure = function(conf) {
  conf.icon = this.resolveAppPath(conf.icon || './public/favicon.ico');
  return conf;
};
