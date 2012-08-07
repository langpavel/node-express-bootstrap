
// SERVER and CONF are global variables



var express = require('express');



SERVER.use(express.errorHandler({
  dumpExceptions: true, 
  showStack: true }
));



SERVER.use(require('connect-repl')());
