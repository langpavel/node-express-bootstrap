
var flash = require('connect-flash');



module.exports = bootFlashMessage;



function bootFlashMessage(conf) {
  return flash(conf);
}
