install:
	npm install

tests:
	@./node_modules/mocha/bin/mocha -R spec

db:
	mongod --dbpath ./data/
