
var fs = require('fs');



module.exports = bootLogger;



function bootLogger(conf) {
  return this.express.logger(conf);
}



bootLogger.configure = function(conf) {
  // setup logging into file
  if(conf.stream) {
    if(conf.stream === 'stdout')
      conf.stream = process.stdout;
    else if(conf.stream === 'stderr')
      conf.stream = process.stderr;
    else {
      if(typeof conf.streamMode === 'undefined')
        conf.streamMode = 0666; // octal notation
      else
        conf.streamMode = parseInt(conf.streamMode, 8); // alwais interpret as octal

      conf.stream = fs.createWriteStream(
        this.resolveAppPath(conf.stream),
        {
          flags: conf.streamFlags || 'a',
          encoding: conf.streamEncoding || 'utf-8',
          mode: conf.streamMode
        }
      );
      
    }
  }

  return conf;
}
