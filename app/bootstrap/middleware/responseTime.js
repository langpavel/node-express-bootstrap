
module.exports = bootResponseTime;



function bootResponseTime(app, conf) {
  app.use(app.express.responseTime());
}
