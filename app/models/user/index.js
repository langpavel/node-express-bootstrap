
var debug = require('debug')('application:model:user');
var MysqlTableManager = require('../mysqlTableManager.js');
var crypto = require('crypto');

// minimum iterations for pbkdf2
var PWD_MIN_ITERATIONS = 100;
var PWD_ITERATIONS = 500;
var PWD_MAX_ITERATIONS = 100000;
var SALT_LENGTH = 10;
var KEY_LENGTH = 40;
var TOTAL_MAX_LENGTH = 80;


var UserProto = {
  verifyPassword: function(password, callback) {

    if(!this.password) {
      return callback(null, false, 'Login by password is disabled for this account');
    }

    var bits = this.password.split(':');
    if(bits.length !== 3)
      return callback(new Error('Invalid password format'));

    var iterations = parseInt(bits[0]);
    var salt = new Buffer(bits[1], 'base64');
    var key = bits[2];

    crypto.pbkdf2(password, salt, iterations, key.length, function(err, derived) {
      if(err) 
        return callback(err);

      if(derived.toString('base64') === key)
        return callback(null, true);
      else
        return callback(null, false, 'Invalid username or password');
    })
  },

  setPassword: function(options, callback) {
    if(typeof options === 'string') {
      options = {
        password: options
      };
    }

    if(!options.iterations && this.password) {
      var bits = this.password.split(':');

      if(bits.length === 3)
        options.iterations = parseInt(bits[0]);
    }

    if(!options.iterations)
      options.iterations = PWD_ITERATIONS;

    if(options.iterations < PWD_MIN_ITERATIONS || options.iterations > PWD_MAX_ITERATIONS)
      options.iterations = PWD_ITERATIONS;

    options.keyLength = options.keyLength || KEY_LENGTH;
    options.saltLength = options.saltLength || SALT_LENGTH;

    crypto.randomBytes(options.saltLength, function(err, salt){
      if(err)
        return callback(err);

      crypto.pbkdf2(
        options.password,
        salt,
        options.iterations,
        options.keyLength,
        function(err, derived) {
          if(err)
            return callback(err);

          var pwd = [
            options.iterations.toString(),
            salt.toString('base64'),
            derived.toString('base64')
          ].join(':');

          if(pwd.length > TOTAL_MAX_LENGTH)
            return callback(new Error('Created hash with salt is bigger than allowed'));

          this.password = pwd;
        }
      );
    });
  }
};



function UserManager(app, conf) {
  // constructor

  // call parent constructor
  MysqlTableManager.call(this, {
    app: app,
    table: 'user',
    autoIncrement: 'id'
  });
};
MysqlTableManager.inherits(UserManager);



UserManager.prototype.findById = function(id, cb) {
  this.findOne({'id': id}, cb);
};



UserManager.prototype.findByUsernameAndVerify = function(username, password, done) {
  this.findOne({ login: username }, function(err, user) {
    if(err)
      return done(err);

    if(!user)
      return done(null, false, { message: 'Invalid username or password' });

    UserProto.verifyPassword.call(user, password, function(err, result, message) {
      if(err)
        return done(err);

      if(result === true)
        return done(null, user);

      return done(null, false, { message: message });
    });
  });
};



module.exports = function(conf) {
  return new UserManager(this, conf);
};
