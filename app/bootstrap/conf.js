
var path = require('path');



module.exports = function bootstrapConf(app) {

  var conf = app.configuration;

  conf.static = path.resolve(__dirname, '../..', conf.static || './public');

  conf.favicon = path.resolve(conf.static, conf.favicon || 'favicon.ico');

  conf.application.views = path.resolve(__dirname, '../..', conf.application.views || './views');

  conf.stylus.src = path.resolve(__dirname, '../..', conf.stylus.src || './public/stylesheets');

  conf.stylus.dest = path.resolve(__dirname, '../..', conf.stylus.dest || conf.stylus.src);

  var opts = app.configuration.application.options;
  for(var opt in opts) {
    app.set(opt, opts[opt]);
  }

};
