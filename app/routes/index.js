
module.exports = exports = function setupRoutes(app) {
  //var CONF = app.configuration;

  //APP.url('home', '/');

  app.get('/', function(req, res) {
    res.render("main/index.jade");
  });

  //require('./login');
};
