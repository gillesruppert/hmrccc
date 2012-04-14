var toString = Object.prototype.toString
var slice = Array.prototype.slice

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isUrl(url) {
  var urlRegex = /^(ht|f)tps?:\/\/[\-a-z0-9\.]+\.[a-z]{2,4}\/?([^\s<>\"\,\{\}\\|\\\^\[\]`]+)?$/
  return urlRegex.test(url)
}

function type(item) {
  var pattern = /\[\w+\s(\w+)\]/, matches

  matches = pattern.exec(toString.call(item))
  return matches[1].toLowerCase()
}

function toArray(args, index) {
  index = index || 0
  return slice.call(args, index)
}

function size(obj) {
  // check for null, undefined
  if (obj == null) return null
  switch (type(obj)) {
    case 'object':
      return Object.keys(obj).length
    case 'array':
      return obj.length
    default:
      return obj.length !== undefined ? obj.length : null
  }
}

exports.capitalise = capitalise
exports.isUrl = isUrl
exports.state = require('./state')
exports.type = type
exports.toArray = toArray
exports.size = size
exports.interpolate = require('./interpolate')
exports.slice = slice
exports.toString = toString
