
module.exports = bootMethodOverride;



function bootMethodOverride(app, conf) {
  app.use(app.express.methodOverride(conf));
}
