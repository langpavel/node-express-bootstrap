
var mysql = require("mysql");



module.exports = bootMysql;



function bootMysql(conf, cb) {

  this.mysql = mysql;

  this.mysqlCreateClient = mysql.createConnection.bind(mysql, conf);

  this.mysqlClient = this.mysqlCreateClient();

  this.mysqlClient.connect(cb);

  return cb;
};
