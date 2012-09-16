var express = require('express')
var app = module.exports = express.createServer()
var logger = require('winston')

// Configuration
require('./configure')(app)
require('./lib/helpers')(app)

// Routes
require('./routes/index')(app)

process.on('uncaughtException', function(err) {
  logger.error(err)
  process.exit(1)
})

// start the app
app.listen(3000, function(){
  logger.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})
