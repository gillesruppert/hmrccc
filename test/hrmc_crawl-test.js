var should = require('should')
var hmrc = require('../lib/hmrc_crawl')
var format = require('util').format
var m = require('mutil')

var BASE_INDEX_URL = hmrc.BASE_INDEX_URL
var getPage = hmrc.getPage
var getMonthUrls = hmrc.getMonthUrls
var getEuroValueforMonth = hmrc.getEuroValueforMonth

describe('hmrc_crawl', function() {
  var dom, months

  describe('#BASE_INDEX_URL', function() {
    it('should be a string', function() {
      BASE_INDEX_URL.should.be.a('string')
      BASE_INDEX_URL.should.equal( 'http://customs.hmrc.gov.uk/channelsPortalWebApp/channelsPortalWebApp.portal?_nfpb=true&_pageLabel=pageImport_RatesCodesTools&columns=1&id=EXRATES_%s')
    })
  })

  describe("#getPage", function() {
    it("should return the index dom", function _1(done) {
      this.timeout(5000)

      function fn (err, window) {
        should.not.exist(err)
        should.exist(window)
        should.exist(window.jQuery)
        window.jQuery('title').text().should.equal('HM Revenue & Customs')
        dom = window
        done()
      }

      var url = format(BASE_INDEX_URL, '2011')
      getPage(url, fn)
    })
  })

  describe('#getValuesForYear', function() {
    it('should return a hash with the values for the year', function(done) {
      this.timeout(5000)

      function fn (err, values) {
        should.exist(values)
        values.should.be.an['instanceof'](Array)
        should.not.exist(err)
        should.exist(values[0])
        should.exist(values[0].rate)
        values[0].rate.should.equal( '1.1756' )
        done()
      }

      hmrc.getValuesForYear('2011', fn)
    })
  })


  describe("#getMonthUrls", function() {
    it("should return a list of urls", function _1() {
      months = getMonthUrls(dom)
      months.should.be.an['instanceof'](Array)
      months.length.should.equal(12)
      months[0].should.not.equal(1)
    })
  })

  describe("#getEuroValueforMonth", function() {
    it("should return the value of the Euro for the month url passed in", function _1(done) {
      getEuroValueforMonth.should.be.a('function')
      this.timeout(5000)

      function fn(value) {
        should.exist(value)
        value.should.equal('1.1756')
        done()
      }

      getEuroValueforMonth(months[0].href, fn)
    })
  })

  describe("#cache", function() {
    it("should cache the previous page calls", function() {
      Object.keys(hmrc.cache).length.should.be.above(0)
    })
  })
})
