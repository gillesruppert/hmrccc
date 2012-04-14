var hmrc = require('../lib/hmrc_crawl')
/*
 * GET home page.
 */

exports.index = function(req, res){




  res.render('index', {
    title: 'HMRC Converter',
    months: {
      // todo put months result here...
    }

  })
}
