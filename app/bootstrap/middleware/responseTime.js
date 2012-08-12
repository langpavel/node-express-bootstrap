
module.exports = bootResponseTime;



function bootResponseTime(app) {
  app.use(app.express.responseTime());
}
