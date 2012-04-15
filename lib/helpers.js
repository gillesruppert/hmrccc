var monthNames = [
  '', // empty value to make the array index 1 based
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

module.exports = function(app) {
  app.helpers({
    monthName: monthName
  })
}

function monthName(month) {
  month = month.split('-')
  var monthIndex = parseInt(month[0], 10)
  return monthNames[monthIndex] + ' ' + month[1]
}
