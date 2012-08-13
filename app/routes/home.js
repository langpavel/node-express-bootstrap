
module.exports = exports = function setupRoutes(conf) {

  this.get('/', function(req, res) {
    res.render("home/index.jade");
  });

};
