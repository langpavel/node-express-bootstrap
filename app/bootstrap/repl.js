
var connectRepl;

module.exports = bootRepl;



function bootRepl(conf) {
  if(!connectRepl)
    connectRepl = require('connect-repl');

  //connectRepl.conf = conf

  return connectRepl({app: this});
}
