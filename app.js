var express = require('express')
var app = module.exports = express.createServer()

// Configuration
require('./configure')(app)
require('./lib/helpers')(app)

// Routes
require('./routes/index')(app)


// start the app
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})
