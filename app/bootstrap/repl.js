
var connectRepl;

module.exports = bootRepl;



function bootRepl(conf) {
  if(!connectRepl)
    connectRepl = require('connect-repl');
  
  return connectRepl({app: this});
}
