
// APP and CONF are global variables



var express = require('express');


module.exports = exports = function bootstrapProduction(app) {
  //var CONF = app.configuration;

  app.use(express.errorHandler({
    dumpExceptions: false, 
    showStack: false }
  ));
};
