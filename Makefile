RM=rm -f
BROWSERIFY=./node_modules/.bin/browserify
UGLIFY=./node_modules/.bin/uglifyjs

BROWSERIFIABLE=$(shell ls browserify/*.js | sed s+browserify/+public/javascripts/+)
UGLIFIABLE=$(shell ls public/javascripts/*.js | grep -ve '\.min\.js$$' | sed s+.js$$+.min.js+)

all: module-bootstrap browserify public/javascripts/site.js
	make uglify

clean: clean-styles clean-uglified clean-browsefied
	$(RM) ./public/javascripts/site.js

clean-styles:
	$(RM) ./public/stylesheets/style.css

clean-browsefied:
	$(RM) $(BROWSERIFIABLE)

clean-uglified:
	$(RM) $(UGLIFIABLE)

download: download-html5shim download-jquery

download-jquery:
	wget http://code.jquery.com/jquery-1.7.2.js -O ./public/javascripts/jquery-1.7.2.js

download-html5shim:
	wget http://html5shim.googlecode.com/svn/trunk/html5.js -O ./public/javascripts/html5.js

public/javascripts/site.js: public/javascripts/jquery-1.7.2.min.js public/javascripts/bootstrap.min.js module-bootstrap
	cat public/javascripts/jquery-1.7.2.min.js public/javascripts/bootstrap.min.js > public/javascripts/site.js

module-bootstrap:
	cd node_modules/bootstrap/ && make bootstrap

public/javascripts/%.min.js:
	$(UGLIFY) public/javascripts/$*.js > public/javascripts/$*.min.js

public/javascripts/%.js:
	$(BROWSERIFY) browserify/$*.js -o public/javascripts/$*.js

browserify: $(BROWSERIFIABLE)
	@echo Browserified: $(BROWSERIFIABLE)

uglify: $(UGLIFIABLE)
	@echo Uglified: $(UGLIFIABLE)

.PHONY:
	clean download download-jquery download-html5shim module-bootstrap browserify uglify

