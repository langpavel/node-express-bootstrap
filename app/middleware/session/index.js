
module.exports = bootSession;



function bootSession(conf) {
  conf.store = this.sessionStore;
  
  return this.express.session(conf);
};
