
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes')

var app = module.exports = express.createServer()

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  app.use(express.logger())
})

app.configure('production', function(){
  app.use(express.errorHandler())
})

var monthNames = [
  '', // empty value to make the array index 1 based
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
app.helpers({
  monthName: function(month) {
    month = month.split('-')
    var monthIndex = parseInt(month[0], 10)
    return monthNames[monthIndex] + ' ' + month[1]
  }
})

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})
