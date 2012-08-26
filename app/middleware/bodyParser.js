
module.exports = bootBodyParser;



function bootBodyParser(conf) {
  return this.express.bodyParser(conf);
}
