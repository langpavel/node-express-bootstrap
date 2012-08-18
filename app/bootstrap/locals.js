
module.exports = bootLocals;



function bootLocals(conf) {
  this.locals(conf);

  return true;
}



bootLocals.configure = function(conf) {
  delete conf.route;
  return conf;
};
