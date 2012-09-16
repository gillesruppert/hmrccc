var express = require('express')
var winston = require('winston')

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
    app.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'logs/info.log'})
      ],
      exitOnError: false,
      colorize: true
    });
  })

  app.configure('production', function(){
    app.use(express.errorHandler())
    app.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({ level: 'error' })
      ]
    });
  })
}
