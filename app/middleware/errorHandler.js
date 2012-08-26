
module.exports = bootErrorHandler;



function bootErrorHandler(conf) {
  return this.express.errorHandler(conf);
}
