
var util = require('util');
var debug = require('debug')('application:model:mysql');



module.exports = MysqlTableManager;



// constructor
function MysqlTableManager(conf) {

  this.getClient = this.getClient || conf.getClient ||
    function() { return conf.app.mysqlClient; };

  this.table = this.table || conf.table;

  this.autoIncrement = this.autoIncrement || conf.autoIncrement;

  if(!this.table)
    throw new Error('table must be specified');
};



MysqlTableManager.inherits = function(ctor) {
  util.inherits(ctor, MysqlTableManager);
};



MysqlTableManager.prototype.findOne = function(criteria, cb) {
  var table = this.table;
  debug(table + ' findOne ' + util.inspect(criteria));
  this.getClient().query(
    'select * from `'+table+'` where ?', 
    criteria,
    function(err, rows, cols) {
      if(err) {
        debug('ERROR: ' + table + ' findOne ' + util.inspect(criteria) + ': ' + err);
        return cb(err);
      }

      if(rows.length !== 1) {
        debug(table + ' findOne fail ' + util.inspect(criteria) + ': ' + rows.length + ' records found');
        return cb(null, false);
      }

      return cb(null, rows[0]);
    }
  );
};



MysqlTableManager.prototype.find = function(criteria, cb) {
  var table = this.table;
  debug(table + ' find ' + util.inspect(criteria));
  this.getClient().query(
    'select * from `'+table+'` where ?', 
    criteria,
    function(err, rows, cols) {
      if(err) {
        debug('ERROR: ' + table + ' findOne ' + util.inspect(criteria) + ': ' + err);
        return cb(err);
      }

      return cb(null, rows);
    }
  );
};



MysqlTableManager.prototype.insert = function(data, cb) {
  var table = this.table;
  var autoIncField = this.autoIncrement;
  debug(table + ' insert ' + util.inspect(criteria));
  this.getClient().query(
    'INSERT INTO `'+table+'` SET ?', 
    data,
    function(err, status) {
      if(err) {
        debug('ERROR: ' + table + ' insert ' + util.inspect(criteria) + ': ' + err);
        return cb(err);
      }

      if(status.insertId && autoIncField)
        data[autoIncField] = status.insertId;

      return cb(null, status);
    }
  );
};
