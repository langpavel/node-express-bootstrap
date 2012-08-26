
module.exports = bootLocals;



function bootLocals(conf) {
  this.locals(conf);

  return function(req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    next();
  };
}



bootLocals.configure = function(conf) {
  delete conf.route;
  return conf;
};
