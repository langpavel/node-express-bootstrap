
var stylus = require("stylus");
var nib = require("nib");



module.exports = bootStylus;



function bootStylus(conf) {
  return stylus.middleware(conf);
}



bootStylus.configure = function(conf) {
  conf.src = this.resolveAppPath(conf.src || './public/stylesheets');
  conf.dest = this.resolveAppPath(conf.dest || conf.src);

  conf.compress = !!conf.compress;

  // Stylus and nib CSS preprocessor
  conf.compile = function(str, path) {
    var result = stylus(str)
      .set('filename', path)
      .set('compress', conf.compress);

    if(conf.useNib)
      result.use(nib());

    return result;
  };

  return conf;
};
