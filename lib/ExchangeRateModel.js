var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hmrcc')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

/*
  Rate: {
    country: 'Europe',
    currency: 'Euro',
    rate: 1.24
    date: Date
  }
 */

var RateSchema = new Schema({
  country: String,
  currency: String,
  date: Date,
  rate: Number
})

mongoose.model('Rate', RateSchema)
var Rate = mongoose.model('Rate')

// create and save the rate
var rate = new Rate()
rate.country = 'Europe (EU)'
rate.currency = 'Euro (EUR)'
rate.rate = 1.2489
rate.date = new Date(2012, 5, 1)

rate.save(function(err) {
  if (err) throw err
  console.log('saved')
  mongoose.disconnect()
})
