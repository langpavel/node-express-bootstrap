

SERVER.get('/', function(req, res) {
  res.locals.title = CONF.site.title;
  res.render("main/index.jade");
});
