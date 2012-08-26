
module.exports = exports = function setupRoute(conf) {

  this.get(conf.route, function(req, res) {
    res.render("home/index.jade");
  });

  return true;
};
