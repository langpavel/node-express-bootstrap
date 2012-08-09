
// APP and CONF are global variables



var express = require('express');



APP.use(express.errorHandler({
  dumpExceptions: true, 
  showStack: true }
));



APP.use(require('connect-repl')());
