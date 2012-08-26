
module.exports = bootResponseTime;



function bootResponseTime(conf) {
  return this.express.responseTime();
}
