test:
	@node node_modules/lab/bin/lab -I inspect
test-cov:
	@node node_modules/lab/bin/lab -I inspect -t 100
test-cov-html:
	@node node_modules/lab/bin/lab -I inspect -r html -o coverage.html

.PHONY: test test-cov test-cov-html


