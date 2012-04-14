var hmrc = require('../lib/hmrc_crawl')
var m = require('mutil')
/*
 * GET home page.
 */

exports.index = function(req, res){

  var year = (new Date()).getFullYear()
  hmrc.getValuesForYear(year, function(err, months) {
    res.render('index', {
      title: 'HMRC Converter',
      months: months.reverse() // list descending
    })
  })
}
