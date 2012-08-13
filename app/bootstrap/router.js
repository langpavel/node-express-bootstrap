
module.exports = bootRouter;



function bootRouter(conf) {

  require('../routes').call(this, conf);

  return this.router;
}
