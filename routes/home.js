var hmrc = require('../lib/hmrc_crawl')
/*
 * GET home page.
 */

module.exports = function(req, res){

  var year = (new Date()).getFullYear()
  if (year !== 2012) return;
  hmrc.getValuesForYear(year, function(err, months) {
    res.render('index', {
      title: 'HMRC Converter',
      months: months.reverse() // list descending
    })
  })
}
