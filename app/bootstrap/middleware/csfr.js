
module.exports = bootCsfr;



function bootCsfr(conf) {
  return this.express.csrf(conf);
}



bootCsfr.configure = function(conf) {
  if(conf.value && (typeof conf.value === 'string'))
    conf.value = new Function('req', 'return ' + conf.value);

  return conf;
}
