
module.exports = exports = function setupRoutes(conf) {

  require('./home').call(this, conf);
  require('./pages').call(this, conf);

};
