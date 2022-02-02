const md = require('markdown-it')()
const iso = require('iso-3166-1')
const moment = require('moment')

const mdToHtml = (string) => string ? md.render(string) : ''

const workLocationDates = (work, delimiter) => {
  if (!delimiter) {
    delimiter = '-'
  }
  const parts = [
    work.name
  ]

  if (work.location) {
    parts.push(work.location)
  }

  if (work.startDate) {
    parts.push(calcDateRange(work.startDate, work.endDate))
  }

  return parts.join(` ${delimiter} `)
}

const calcLocation = (location) => {
  const array = []

  if (!location) {
    return null
  }

  if (location.city) {
    array.push(location.city)
  }

  if (location.region) {
    array.push(location.region)
  }

  if (location.countryCode) {
    const country = iso.whereAlpha2(location.countryCode)
    array.push(country && array.length < 2 ? country.country : location.countryCode)
  }

  return array.length > 0 ? array.join(', ') : null
}

const calcDateRange = (start, end) => {
  const array = []

  if (start) {
    array.push(beautifyDate(start))
  }

  array.push(end ? beautifyDate(end) : 'Present')

  return array.join(' - ')
}

const beautifyDate = (date) => moment(date, 'YYYY-MM-DD').format('MMM YYYY')
const formatDate = (date, format) => moment(date, 'YYYY-MM-DD').format(format)

const friendlyDuration = (start, end) => {
  const mStart = moment(start)
  const mEnd = moment(end)
  return moment.duration(mEnd.diff(mStart)).humanize()
}

const beautifyArray = (separator, array) => array.filter(x => x).join(separator)

const arrayToPhrase = (array) => {
  let str = ''
  const a = array.filter(x => x)

  if (a.length === 1) {
    str = a[0]
  } else if (a.length === 2) {
    str = a.join(' and ')
  } else if (a.length > 2) {
    str = a.slice(0, -1).join(', ') + ' and ' + a.slice(-1)
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

const beautifyLink = (string) => {
  let s = string.trim().replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
  s = s.endsWith('/') ? s.slice(0, -1) : s
  s = s.split('/')
  s[0] = `<strong>${s[0]}</strong>`
  return s.join('/')
}

const validArray = (array) => array !== undefined && array.length > 0

module.exports = {
  mdToHtml,
  calcLocation,
  calcDateRange,
  beautifyDate,
  formatDate,
  beautifyArray,
  arrayToPhrase,
  beautifyLink,
  workLocationDates,
  friendlyDuration,
  validArray
}
