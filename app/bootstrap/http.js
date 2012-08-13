
var http = require('http');
var util = require('util');

var debug = require('debug')('application:bootstrap:http');



module.exports = bootHttpServer;



function bootHttpServer(conf, cb) {
  var args;

  function setArgs(val) {
    if(args)
      throw new Error('Trying to reassign http configuration');

    if(!util.isArray(val))
      throw new Error('Args must be an array');

    args = val;
  }

  if(conf.listen)
    setArgs(util.isArray(conf.listen) ? conf.listen : [conf.listen]);

  if(conf.socket)
    setArgs([conf.socket]);

  if(conf.port) {
    if(typeof conf.port === 'string') {
      conf.port = parseInt(conf.port);
      if(isNaN(conf.port))
        conf.port = 0;
    }
    var a = [conf.port];
    
    if(conf.hostname || conf.host)
      a.push(conf.hostname || conf.host);

    if(conf.backlog)
      a.push(parseInt(conf.backlog));

    setArgs(a);
  }

  if(!args)
    throw new Error('Misconfigured');

  var callback = function() {
    debug("Server listening: " + conf.listen);
    cb(null);
  };

  var server = http.createServer(this);
  server.on('error', cb);
  server.on('listening', function() {
    debug("Server listening: " + util.inspect(server.address()));
    cb(null);
  });
  server.listen.apply(server, args);

  this.modules['http@'+conf.route] = server;

  return cb;
}
