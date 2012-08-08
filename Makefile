RM=rm -f


all:
	@echo "Select make target"

clean:
	$(RM) ./public/stylesheets/style.css

.PHONY:
	clean
