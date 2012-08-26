
var path = require('path');
var fs = require('fs');

var showdown = require('showdown');
var showdownConverter = new showdown.converter();


module.exports = exports = function setupRoute(conf) {

  this.get(conf.route+'/:page$', function(req, res, next) {
    var filename = this.resolveAppPath('./pages', req.params.page + '.md');
    fs.readFile(filename, 'utf-8', function(err, text) {
      if(err) return next(); // go next match routing

      var html = showdownConverter.makeHtml(text);

      res.render('pages/default.jade', { text: text, html: html });
    });
  });

  return true;
};
