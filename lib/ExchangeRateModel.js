var mongoose = require('mongoose')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var RateSchema = new Schema({
  country: String,
  currency: String,
  date: Date,
  rate: Number
})

mongoose.model('Rate', RateSchema)
exports.Rate = mongoose.model('Rate')

//var konphyg = require('konphyg')(__dirname + '/../config')
//var config = konphyg('hmrc').database

//mongoose.connect(config.host)
// create and save the rate
//var rate = new Rate()
//rate.country = 'Europe (EU)'
//rate.currency = 'Euro (EUR)'
//rate.rate = 1.2489
//rate.date = new Date(2012, 5, 1)

//rate.save(function(err) {
  //if (err) throw err
  //console.log('saved')
  //mongoose.disconnect()
//})
