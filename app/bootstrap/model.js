
var fs = require('fs');
var async = require('async');



module.exports = bootModel;



function bootModel(conf, callback) {
  var modul, instance;
  var req_decorators = [];
  this.model = this.model || {};

  for(var key in conf.models) {
    modul = require(this.resolveAppPath(conf.models[key]));

    this.model[key] = instance = modul.call(this, conf[key] || {});

    if(instance.requestDecorator) {
      req_decorators.push(instance.requestDecorator.bind(instance));
    }
  }

  if(req_decorators.length > 0) {
    return function(req, res, next) {
      async.forEach(
        req_decorators,
        function(item, callback) {
          item(req, res, callback);
        },
        function(err) { return next(err); }
      )
    }
  } else {
    return true;
  }
};



bootModel.configure = function(conf) {
  return conf;
}



/*
function getObject(root, path) {
  var obj = root;
  var access;
  path.replace(/(([^\.#]+)|([\.#]))/g, function(match) {
    if(match === '.' || match === '#') {
      access = getObject[match];
    } else {

    }
    return match;
  });
}

getObject['.'] = function(obj, child) {
  if(obj !== null, typeof obj !== 'undefined' && typeof obj[child] !== 'undefined')
    return obj[child];
  return null;
};

getObject['#'] = function(obj, child) {
  if(obj !== null, typeof obj !== 'undefined' && typeof obj[child] !== 'undefined') {
    return (new obj())[child];
  }
  return null;
};
*/
