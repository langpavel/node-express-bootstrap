
module.exports = bootRepl;



function bootRepl(conf) {
  if(!bootRepl.connectRepl)
    bootRepl.connectRepl = require('connect-repl');

  //connectRepl.conf = conf

  return bootRepl.connectRepl({app: this});
}
