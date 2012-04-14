var util = require('../mutil')
var should = require('should')
var sinon = require('sinon')

describe('state', function() {

  // to be mixed into the test
  function setUrl(key, url) {
    if (url == null) {
      this[key] = url
    } else if (typeof url === 'string' && util.isUrl(url.trim())) {
      this[key] = url.trim()
    }
  }

  describe('#set', function() {
    var state

    beforeEach(function() { state = Object.create(util.state) })

    it('should have a #set method', function() {
      should.exist(state.set)
      should.not.exist(state.url)
      state.set.should.be.a('function')
    })

    it('should set a property of the name passed in', function() {
      state.set('url', 'http://www.example.com')
      should.exist(state.url)
      state.url.should.equal('http://www.example.com')
    })

    it('should use a custom setter if one exists', function() {
      state._setUrl = setUrl
      state.set('url', '  http://www.example.com  ')
      state.url.should.equal('http://www.example.com')
    })

    it('should set the property directly if no customer setter is available', function() {
      should.not.exist(state.foo)
      state.set('foo', 'bar')
      should.exist(state.foo)
      state.foo.should.equal('bar')
    })

    it('should not save the value unless the value is undefined, null or a url', function() {
      state._setUrl = setUrl
      should.not.exist(state.url)
      state.set('url', '')
      should.not.exist(state.url)
      state.set('url', 'htt:aa')
      should.not.exist(state.url)
      state.set('url', null)
      should.strictEqual(state.url, null)
      state.set('url')
      should.strictEqual(state.url, undefined)
      state.set('url', 'http://www.example.com')
      state.url.should.equal('http://www.example.com')
      state.set('url', '')
      state.url.should.equal('http://www.example.com')
      state.set('url')
      should.strictEqual(state.url, undefined)
    })
  })

  describe('#get', function() {
    var state
    beforeEach(function() {
      state = Object.create(util.state)
      state.set('url', 'http://www.example.com')
      state.set('foo', 'bar')
    })

    it('should return the value of the property', function _1() {
      state.get('url').should.equal('http://www.example.com')
      state.get('foo').should.equal('bar')
      should.strictEqual(state.get('baz'), undefined)
    })
  })

  describe('#watch', function() {
    var state, spy, state1, state2, spy1, spy2

    beforeEach(function() {
      state = Object.create(util.state)
      state1 = Object.create(util.state)
      state2 = Object.create(util.state)
      spy = sinon.spy()
      spy1 = sinon.spy()
      spy2 = sinon.spy()
    })

    it('should call the callback if any value is changed', function _1() {
      state.watch(spy)
      state.set('test', 1)
      spy.calledOnce.should.be['true']
    })

    it('should call the callback with the key, oldvalue and new value', function _2() {
      state.watch(spy)
      state.set('test', 2)
      spy.args[0][0].should.equal('test')
      should.strictEqual(undefined, spy.args[0][1])
      spy.args[0][2].should.equal(2)
    })

    it('should have separate watch lists', function _3() {
      state1.watch(spy1)
      state2.watch(spy2)
      Object.keys(state1.__watchers__).length.should.equal(1)
      Object.keys(state2.__watchers__).length.should.equal(1)
      state1.__watchers__['@all'].should.not.equal(state2.__watchers__['@all'])
    })

    it('should not call the watcher if the new value is the same as the old value', function _4() {
      state.watch(spy)
      state.set('test', 1)
      spy.calledOnce.should.be['true']
      state.set('test', 1)
      spy.calledOnce.should.be['true']
    })

    it('should watch only the key changes that are being watched', function _5() {
      state.watch('test', spy)
      state.set('test', 1)
      state.set('foo', 'bar')
      spy.callCount.should.equal(1)
      state.set('test', 2)
      spy.callCount.should.equal(2)
      state.set('foo', 'baz')
      spy.callCount.should.equal(2)
    })

    it('should allow multiple watchers on all property changes', function _6() {
      state.watch(spy1)
      state.watch(spy2)
      state.set('test', 1)
      spy1.callCount.should.equal(1)
      spy2.callCount.should.equal(1)
      state.set('foo', 'bar')
      spy1.callCount.should.equal(2)
      spy2.callCount.should.equal(2)
    })

    it('should allow multiple watchers on individual properties', function _7() {
      state.watch(spy)
      state.watch('test', spy1)
      state.watch('test', spy2)
      spy.callCount.should.equal(0)
      spy1.callCount.should.equal(0)
      spy2.callCount.should.equal(0)
      state.set('foo', 'bar')
      spy.callCount.should.equal(1)
      spy1.callCount.should.equal(0)
      spy2.callCount.should.equal(0)
      state.set('test', 1)
      spy.callCount.should.equal(2)
      spy1.callCount.should.equal(1)
      spy2.callCount.should.equal(1)
    })
  })
})
