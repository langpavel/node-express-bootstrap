
module.exports = exports = function setupRoutes(conf) {

  require('./home')(this, conf);
  require('./pages')(this, conf);

};
