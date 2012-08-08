

SERVER.get('/', function(req, res) {
  res.locals.title = "title";
  res.render("pages/main.html.jade");
});
