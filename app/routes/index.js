
module.exports = exports = function setupRoutes(app) {

  require('./home')(app);
  require('./pages')(app);

};
