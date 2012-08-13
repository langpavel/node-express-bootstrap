
module.exports = bootCsfr;



function bootCsfr(conf) {
  
  if(conf.value && (typeof conf.value === 'string'))
    conf.value = new Function('req', 'return ' + conf.value);

  return this.express.csrf(conf);
}
