
// SERVER and CONF are global variables



var express = require('express');



SERVER.use(express.errorHandler({
  dumpExceptions: false, 
  showStack: false }
));
