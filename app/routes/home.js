
module.exports = exports = function setupRoutes(app, conf) {

  app.get('/', function(req, res) {
    res.render("home/index.jade");
  });

};
