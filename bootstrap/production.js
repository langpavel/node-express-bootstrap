
// APP and CONF are global variables



var express = require('express');



APP.use(express.errorHandler({
  dumpExceptions: false, 
  showStack: false }
));
