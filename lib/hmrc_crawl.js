var jsdom = require('jsdom')
var each = require('underscore').each
var format = require('util').format
var m = require('mutil')
var logger = new (require('devnull'))()

var BASE_INDEX_URL = 'http://customs.hmrc.gov.uk/channelsPortalWebApp/channelsPortalWebApp.portal?_nfpb=true&_pageLabel=pageImport_RatesCodesTools&columns=1&id=EXRATES_%s'
var LINK = 'Rates of Exchange for Customs and VAT purposes'
var cache = {}
var cache_creation

function getPage(url, fn) {
  if (Date.now() - cache_creation > 86400000) {
    logger.info('invalidate cache')
    cache = {}
  }
  if (cache[url]) return fn(null, cache[url])

  jsdom.env(url, [
    'http://code.jquery.com/jquery-1.7.1.min.js'
  ], function(err, window) {
    if (err) logger.err(err)
    if (!err) {
      if (m.size(cache) === 0) cache_creation = Date.now()
      cache[url] = window
    }
    fn(err, window)
  })
}

function getValuesForYear(year, fn) {
  var counter, months
  function pageHandler(err,  window) {
    if (err) { logger.error(err); return }
    months = getMonthUrls(window)
    counter = months.length
    months.forEach(monthsHandler)
  }

  function monthsHandler(month) {
    // we need the closure to keep hold of the month reference.
    // TODO revisit this API. it doesn't feel very nice to work with.
    // Maybe go completely callback based or promise based?
    getEuroValueforMonth(month.href, function(err, value) {
      if (err) logger.error('did not get value for month', month.name, month)
      month.rate = value
      if (!--counter) fn(err, months)
    })
  }
  year = '' + year // make sure the year is a string
  getPage(format(BASE_INDEX_URL, year), pageHandler)
}

function getMonthUrls(window) {
  var months, col, as, i, l, pattern, matches
  months = []
  pattern = new RegExp(LINK + ' (\\d{2}-\\d{4})')

  col = window.document.getElementById('centre_col')
  if (!col) throw new Error('hmrc.getMonthUrls: no correct DOM element found')
  as = col.getElementsByTagName('a')

  each(as, function(a) {
    var linkText = a.innerHTML,
        month = { }
    if (linkText.indexOf(LINK) !== 0) return
    matches = pattern.exec(linkText)
    month.name = matches[1]
    month.href = a.href
    months.push(month)
  })

  // months are descending on the page. We want them ascending!
  return months.reverse()
}

function getEuroValueforMonth(url, fn) {
  getPage(url, function(err, win) {
    if (err) logger.error(err)
    fn(err, getEuroValue(win))
  })
}

function getEuroValue(window) {
  if (!window) { logger.error('no DOM', window); return }
  var $ = window.jQuery
  return $('table:eq(1) tr:eq(1) td:eq(2) p:eq(0)').text()
}


exports.BASE_INDEX_URL = BASE_INDEX_URL
exports.getPage = getPage
exports.getMonthUrls = getMonthUrls
exports.getEuroValueforMonth = getEuroValueforMonth
exports.cache = cache
exports.getValuesForYear = getValuesForYear
