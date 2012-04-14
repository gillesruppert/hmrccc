var capitalise = require('./mutil').capitalise
var toString = require('./mutil').toString

module.exports = {
  __watchers__: null,

  set: function(key, value) {
    // initialise the watchers object.
    if (this.__watchers__ === null) this.__watchers__ = {}
    var w = this.__watchers__
    if (typeof key !== 'string') return

    // custom setters are in the format `_setKey`
    var setterName = '_set' + capitalise(key)
    // callback function for the iterators
    function cb(fn) { fn(key, this[key], value) }

    // only call the watcher if the value is not the same as the old value
    if (value !== this[key]) {
      if (w[key]) w[key].forEach(cb)
      if (w['@all']) w['@all'].forEach(cb)
    }

    if (typeof this[setterName] === 'function') {
      this[setterName](key, value)
    } else {
      this[key] = value
    }
  },

  get: function(key) {
    return this[key];
  },

  watch: function(key, fn) {
    if (this.__watchers__ === null) this.__watchers__ = {}

    var w = this.__watchers__

    if (toString.call(key) === '[object Function]') {
      fn = key
      key = '@all'
    }

    if (!w[key]) w[key] = []
    w[key].push(fn)
  }
}

