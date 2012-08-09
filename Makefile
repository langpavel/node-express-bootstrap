RM=rm -f


all: public/javascripts/site.js

clean:
	$(RM) ./public/stylesheets/style.css
	$(RM) public/javascripts/jquery-1.7.2.js
	$(RM) public/javascripts/jquery-1.7.2.min.js
	$(RM) ./public/javascripts/site.js

download: download-html5shim download-jquery

download-jquery:
	wget http://code.jquery.com/jquery-1.7.2.js -O ./public/javascripts/jquery-1.7.2.js
	wget http://code.jquery.com/jquery-1.7.2.min.js -O ./public/javascripts/jquery-1.7.2.min.js	

public/javascripts/jquery-1.7.2.js: download-jquery

public/javascripts/jquery-1.7.2.min.js: download-jquery

public/javascripts/site.js: public/javascripts/jquery-1.7.2.min.js public/javascripts/bootstrap.min.js module-bootstrap
	cat public/javascripts/jquery-1.7.2.min.js public/javascripts/bootstrap.min.js > public/javascripts/site.js

download-html5shim:
	wget http://html5shim.googlecode.com/svn/trunk/html5.js -O ./public/javascripts/html5.js

module-bootstrap:
	cd node_modules/bootstrap/ && make bootstrap

.PHONY:
	clean download download-jquery download-html5shim module-bootstrap

