
module.exports = bootFavicon;



function bootFavicon(app, conf) {
  conf.icon = app.resolveAppPath(conf.icon || './public/favicon.ico');
  app.use(app.express.favicon(conf.icon));
}
