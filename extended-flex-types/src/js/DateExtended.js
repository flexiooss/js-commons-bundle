import {assertType, isNumber, isString} from './__import__assert'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from './__import__flex-types'
import {DateTime} from 'luxon'
import {DateTimeFormatter} from './date-formatter/DateFormatter'

/**
 *
 * @param {(string|number)} input
 * @param {number} expectedLength
 * @param {string} replaceWith
 * @return {string}
 */
const padLeft = (input, expectedLength, replaceWith = '0') => {
  assertType(
    isString(input) || isNumber(input),
    'padLeft: `input` argument should be a string or number'
  )
  assertType(
    isNumber(expectedLength),
    'padLeft: `expectedLength` argument should be a number'
  )
  assertType(
    isString(replaceWith),
    'padLeft: `replaceWith` argument should be a replaceWith'
  )
  return Array(expectedLength - String(input).length + 1).join(replaceWith) + input
}

/**
 * @desc
 * - une FlexDateTime (Service/API) est toujours considérée en UTC, donc pas de Timezone
 * - on ne manipule que des dates UTC, pas de parse en date locale (comportement natif à JS)
 * - les Timezones ne sont utilisés qu'en entrée et en sortie : au parse et au formatage
 */
export class DateExtended extends Date {
  constructor(dateString, ...args) {
    if (isString(dateString)) {
      /**
       * @type {boolean}
       */
      let errorDate = false
      /**
       * @type {boolean}
       */
      let errorDateTime = false
      try {
        new FlexDate(dateString)
      } catch {
        errorDate = true
      }
      try {
        new FlexZonedDateTime(dateString)
      } catch {
        errorDateTime = true
      }
      if (errorDate && errorDateTime) {
        throw TypeError('Date string pattern not match : ' + dateString)
      }
    }
    super(dateString, ...args);
  }

  /**
   * @param {FlexTime} flexTime
   * @return {DateExtended}
   */
  static fromFlexTime(flexTime) {
    throw new Error('pas bien faire class Time')
    assertType(
      flexTime instanceof FlexTime,
      'DateExtended:fromFlexTime: `flexTime` argument should be an instance of FlexTime'
    )
    let time = flexTime.toJSON().split(/[:.]/g)
    const hours = time[0] ? parseInt(time[0]) : 0
    const minutes = time[1] ? parseInt(time[1]) : 0
    const seconds = time[2] ? parseInt(time[2]) : 0
    const millis = time[3] ? parseInt(time[3]) : 0
    const date = new DateExtended()
    date.setHours(hours, minutes, seconds, millis)
    return date
  }

  /**
   *
   * @param {FlexTime} flexTime
   * @return {DateExtended}
   */
  static fromUTCFlexTime(flexTime) {
    throw new Error('pas bien faire class Time')
    const tmp = DateExtended.fromFlexTime(flexTime)
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   * @param {FlexZonedDateTime} flexZonedDateTime
   * @return {DateExtended}
   */
  static fromFlexZonedDateTime(flexZonedDateTime) {
    assertType(
      flexZonedDateTime instanceof FlexZonedDateTime,
      'DateExtended:fromFlexZonedDateTime: `flexZonedDateTime` argument should be an instance of FlexZonedDateTime'
    )
    return new DateExtended(flexZonedDateTime.toJSON())
  }

  /**
   * @param {FlexDate} flexDate
   * @return {DateExtended}
   */
  static fromFlexDate(flexDate) {
    assertType(
      flexDate instanceof FlexDate,
      'DateExtended:fromFlexDate: `flexDate` argument should be an instance of FlexDate'
    )
    let fullDate = flexDate.toJSON().split('-')
    return new DateExtended.UTC(parseInt(fullDate[0]), parseInt(fullDate[1]) - 1, parseInt(fullDate[2]))
  }

  /**
   *
   * @param {FlexDate} flexDate
   * @return {DateExtended}
   */
  static fromUTCFlexDate(flexDate) {
    throw new Error('pas bien')
    const tmp = DateExtended.fromFlexDate(flexDate)
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromFlexDateTime(flexDateTime) {
    return DateExtended.fromISOWithTimezone(flexDateTime.toJSON())
  }

  /**
   *
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromUTCFlexDateTime(flexDateTime) {
    return DateExtended.fromFlexDateTime(flexDateTime)
  }


  /**
   * @param {string} date ISO datetime without Z or offset
   * @param {string} timezone
   * @return {DateExtended}
   */
  static fromISOWithTimezone(date, timezone = 'UTC') {
    const clean = date.endsWith('Z') ? date.replace('Z', '') : date
    const dateTime = DateTime.fromISO(clean, {zone: timezone, setZone: true})
    const iso = dateTime.toUTC().toISO()
    // console.log('iso : ' + iso, 'offset '+dateTime.offset)

    return new DateExtended(iso)
  }

  /**
   * @param {string} date
   * @param {string} format
   * @param {string} timeZone
   * @return {DateExtended}
   */
  static fromCustomFormat(date, format, timeZone = 'utc') {
    const iso = DateTime.fromFormat(date, format, {zone: timeZone}).toISO()
    return new DateExtended(iso)
  }

  /**
   * @param format
   * @param locale
   * @param timeZone
   * @return {string}
   */
  format(format, locale, timeZone = 'UTC') {
    return DateTimeFormatter.format(this.toUTCFlexDateTime(), format, locale, timeZone)
  }

  /**
   * @return {string}
   */
  toUTCFullDate() {
    return this.toISOString().split('T')[0]
  }

  /**
   *
   * @return {string}
   */
  toUTCTime() {
    return this.toISOString().split('T')[1].split('Z')[0]
  }

  /**
   *
   * @return {string}
   */
  toLocaleFullDate() {
    throw new Error('pas bien utiliser format')
    return this.getFullYear() + '-' +
      padLeft(this.getMonth() + 1, 2) + '-' +
      padLeft(this.getDate(), 2)
  }

  /**
   *
   * @return {string}
   */
  toLocaleTime() {
    throw new Error('pas bien utiliser format')
    return padLeft(this.getHours(), 2) + ':' +
      padLeft(this.getMinutes(), 2) + ':' +
      padLeft(this.getSeconds(), 2) + '.' +
      padLeft(this.getMilliseconds(), 3)
  }

  /**
   *
   * @return {number}
   */
  getNextMonth() {
    return this.setMonth(this.getUTCMonth() + 1)
  }

  /**
   * @return {number}
   */
  getPreviousMonth() {
    return this.setMonth(this.getUTCMonth() - 1)
  }

  /**
   *
   * @return {number}
   */
  getDaysInMonth() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
  }

  getWeekNumber() {
    let date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()))
    let dayNum = date.getUTCDay() || 7
    date.setUTCDate(date.getUTCDate() + 4 - dayNum)
    let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  }

  /**
   *
   * @returns {FlexZonedDateTime}
   */
  UTCToFlexZonedDateTime() {
    let str = this.toISOString()
    return new FlexZonedDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toLocaleFlexDateTime() {
    throw new Error('pas bien')
    let str = this.toLocaleFullDate() + 'T' + this.toLocaleTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toUTCFlexDateTime() {
    let str = this.toUTCFullDate() + 'T' + this.toUTCTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toLocaleFlexDate() {
    throw new Error('pas bien')
    let str = this.toLocaleFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toUTCFlexDate() {
    let str = this.toUTCFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toLocaleFlexTime() {
    throw new Error('pas bien')
    let str = this.toLocaleTime()
    return new FlexTime(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toUTCFlexTime() {
    let str = this.toUTCTime()
    return new FlexTime(str)
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexDate}
   */
  static fromStringToFlexDate(value) {
    throw new Error('pas bien')
    try {
      let flexDate = DateExtended.fromFlexDate(new FlexDate(value)).toLocaleFlexDate()
      if (flexDate instanceof FlexDate) {
        return flexDate
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexDateTime}
   */
  static fromStringToFlexDateTime(value) {
    throw new Error('pas bien')
    try {
      let flexDateTime = DateExtended.fromFlexDateTime(new FlexDateTime(value)).toLocaleFlexDateTime()
      if (flexDateTime instanceof FlexDateTime) {
        return flexDateTime
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexTime}
   */
  static fromStringToFlexTime(value) {
    throw new Error('pas bien')
    try {
      let flexTime = DateExtended.fromFlexTime(new FlexTime(value)).toLocaleFlexTime()
      if (flexTime instanceof FlexTime) {
        return flexTime
      }
      return null
    } catch (e) {
      return null
    }
  }
}
