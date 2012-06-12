var express = require('express')
var Logger = require('devnull')

module.exports = function(app) {
  app.configure(function(){
    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade')
    app.use(express.logger())
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    app.use(app.router)
    app.use(express.static(__dirname + '/public'))
  })

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
    app.logger = new Logger({
      env: 'development'
    })
  })

  app.configure('production', function(){
    app.use(express.errorHandler())
    app.logger = new Logger({
      env: 'production'
    })
  })
}
