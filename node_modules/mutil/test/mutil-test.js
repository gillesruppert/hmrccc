var util = require('../mutil')
var should = require('should')
var sinon = require('sinon')


describe('#capitalise', function() {

  it('should uppercase the 1st letter of the string', function _1() {
    util.capitalise('hello').should.equal('Hello')
    util.capitalise('world').should.equal('World')
    util.capitalise('Foo').should.equal('Foo')
    util.capitalise('foo bar').should.equal('Foo bar')
  })
})

describe('#isUrl', function() {
  it('should return true if the url is valid', function _1() {
    util.isUrl('http://www.example.com').should.be['true']
    util.isUrl('https://www.example.com').should.be['true']
    util.isUrl('ftp://www.example.com').should.be['true']
    util.isUrl('ftps://www.example.com').should.be['true']
    util.isUrl('http://www.example.co.uk').should.be['true']
    util.isUrl('http://www.example.co.uk?foo').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar&foo=baz').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar&amp;foo=baz').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar&amp;foo=baz%20').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar&amp;foo=baz%20#hash').should.be['true']
    util.isUrl('http://www.example.co.uk?foo=bar&amp;foo=baz%20#hash:@').should.be['true']
  })

  it('should return false if the url is not valid', function _2() {
    util.isUrl('').should.be['false']
    util.isUrl().should.be['false']
    util.isUrl('htt://www.example.com').should.be['false']
  })
})


describe('#type', function() {
  it('should return "string" if a string was passed', function() {
    util.type('').should.equal('string')
    util.type('test').should.equal('string')
    util.type(new String()).should.equal('string')
  })

  it('should return "boolean" if a boolean was passed', function() {
    util.type(true).should.equal('boolean')
    util.type(false).should.equal('boolean')
    util.type(new Boolean(true)).should.equal('boolean')
    util.type(new Boolean(false)).should.equal('boolean')
    util.type(new Boolean()).should.equal('boolean')
  })

  it('should return "array" if an array was passed', function() {
    util.type([]).should.equal('array')
    util.type([1,2,3]).should.equal('array')
    util.type(new Array()).should.equal('array')
  })

  it('should return "function" if a function was passed', function() {
    util.type(function() {}).should.equal('function')
    util.type(new Function()).should.equal('function')
  })

  it('should return "number" if a number was passed', function() {
    util.type(1).should.equal('number')
    util.type(new Number()).should.equal('number')
  })

  it('should return "object" if an object was passed', function() {
    var F = function() {}
    util.type({}).should.equal('object')
    util.type(new Object()).should.equal('object')
    util.type(new F()).should.equal('object')
  })

  it('should return "date" if a date object was passed', function() {
    util.type(new Date()).should.equal('date')
  })

  it('should return "regexp" if a regexp object was passed', function() {
    util.type(new RegExp()).should.equal('regexp')
    util.type(/.*/).should.equal('regexp')
  })

  it('should return "null" if null was passed', function() {
    util.type(null).should.equal('null')
  })

  it('should return "undefined" if undefined was passed', function() {
    util.type(undefined).should.equal('undefined')
  })
})

describe("#toArray", function() {
  it("should convert array like objects to an array", function() {
    function tester() {
      var args = util.toArray(arguments)
      arguments.should.be['arguments']
      arguments.should.not.be.a('array')
      args.should.be.an.array
      args[0].should.equal(arguments[0])
      args[1].should.equal(arguments[1])
      args[2].should.equal(arguments[2])
    }

    tester(1,2,3)
  })

  it("should slice the arguments if the optional index is passed", function() {
    function tester() {
      var args = util.toArray(arguments, 1)
      arguments.length.should.equal(3)
      args.length.should.equal(2)
      args[0].should.equal(arguments[1])
      args[1].should.equal(arguments[2])
    }

    tester(1,2,3)
  })
})

describe("#size", function() {
  it("should return the size of an object", function() {
    util.size({}).should.equal(0)
    util.size({a: 1}).should.equal(1)
    util.size({
      a: 1,
      b: 2,
      c: 3
    }).should.equal(3)
  })

  it("should only count properties that are part of the current object and not the prototype chain", function() {
    var parent = {a: 1, b:2, c: 3}
    var child = Object.create(parent)
    child.d = 4
    child.e = 5
    child.f = 6
    util.size(parent).should.equal(3)
    util.size(child).should.equal(3)
  })

  it("should return array.length if an array was passed", function() {
    var a = [1,2,3,4,5,6]
    util.size(a).should.equal(a.length)
  })

  it("should return arguments.length if an arguments object was passed", function() {
    function tester() {
      util.size(arguments).should.equal(arguments.length)
    }
    tester(1,2,3,4)
  })

  it("should return the number of args if a function was passed", function() {
    var func0 = function() {}
    var func1 = function(a) {}
    var func2 = function(a,b) {}
    util.size(func0).should.equal(0)
    util.size(func1).should.equal(1)
    util.size(func2).should.equal(2)
  })

  it("should return null if a date was passed", function() {
    should.not.exist(util.size(new Date()))
  })

  it("should return null if a RegExp was passed", function() {
    should.not.exist(util.size(new RegExp("\\d")))
  })

  it("should return null if null was passed", function() {
    should.not.exist(util.size(null))
  })

  it("should return null if undefined was passed", function() {
    should.not.exist(util.size(undefined))
  })
})

