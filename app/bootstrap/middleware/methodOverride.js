
module.exports = bootMethodOverride;



function bootMethodOverride(conf) {
  return this.express.methodOverride(conf.key);
}
