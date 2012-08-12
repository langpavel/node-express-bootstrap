


var express = require('express');


module.exports = exports = function bootstrapDevelopment(app) {
  //var CONF = app.configuration;

  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true }
  ));

  app.use(require('connect-repl')({app: app}));
};
