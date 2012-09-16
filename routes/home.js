var hmrc = require('../lib/hmrc_crawl')
var app = require('../app')
/*
 * GET home page.
 */

module.exports = function(req, res){

  var year = (new Date()).getFullYear()
  if (year !== 2012) return;
  app.logger.info('year is: ' + year)
  hmrc.getValuesForYear(year, function(err, months) {
    if (err) {
      app.logger.error(err)
      return;
    }
    app.logger.info('got ' + months.length + ' months')
    res.render('index', {
      title: 'HMRC Converter',
      months: months.reverse() // list descending
    })
  })
}
