
module.exports = bootLocals;



function bootLocals(app) {
  app.locals(app.configuration.application.locals);
}
