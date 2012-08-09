
module.exports = exports = function setupRoutes(app) {

  app.get('/', function(req, res) {
    res.render("home/index.jade");
  });

};
