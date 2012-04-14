var hmrc = require('../lib/hmrc_crawl')
/*
 * GET home page.
 */

exports.index = function(req, res){




  res.render('index', {
    title: 'HMRC Converter',
    months: {
      "January 2011": "1.1756",
      "February 2011": "1.1846",
      "March 2011": "1.1867",
      "April 2011": "1.1502",
      "May 2011": "1.1307",
      "June 2011": "1.1331",
      "July 2011": "1.1179",
      "August 2011": "1.1368",
      "September 2011": "1.1382",
      "October 2011": "1.14",
      "November 2011": "1.1471",
      "December 2011": "1.1621",
      "January 2012": "1.2005",
      "February 2012": "1.2022",
      "March 2012": "1.1832"
    }

  })
}
