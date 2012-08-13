
module.exports = bootLocals;



function bootLocals(conf) {

  delete conf.route;

  this.locals(conf);

  return true;
}
