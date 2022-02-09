import {assertType, isNumber, isString} from './__import__assert'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from './__import__flex-types'

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
 * @Deprecated Use FlexDateTimeExtended, FlexDateExtended, FlexTimeExtended
 */
export class DateExtended extends Date {

  /**
   * @param {FlexTime} flexTime
   * @return {DateExtended}
   */
  static fromFlexTime(flexTime) {
    console.error("[DEPRECATED] DO NOT USE")
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
    console.error("[DEPRECATED] DO NOT USE")
    const tmp = DateExtended.fromFlexTime(flexTime)
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   * @param {FlexZonedDateTime} flexZonedDateTime
   * @return {DateExtended}
   */
  static fromFlexZonedDateTime(flexZonedDateTime) {
    console.error("[DEPRECATED] DO NOT USE")
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
    console.error("[DEPRECATED] DO NOT USE")
    assertType(
      flexDate instanceof FlexDate,
      'DateExtended:fromFlexDate: `flexDate` argument should be an instance of FlexDate'
    )
    let fullDate = flexDate.toJSON().split('-')
    return new DateExtended(fullDate[0], fullDate[1] - 1, fullDate[2])
  }

  /**
   *
   * @param {FlexDate} flexDate
   * @return {DateExtended}
   */
  static fromUTCFlexDate(flexDate) {
    console.error("[DEPRECATED] DO NOT USE")
    const tmp = DateExtended.fromFlexDate(flexDate)
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromFlexDateTime(flexDateTime) {
    console.error("[DEPRECATED] DO NOT USE")
    assertType(
      flexDateTime instanceof FlexDateTime,
      'DateExtended:fromFlexDateTime: `flexDateTime` argument should be an instance of FlexDateTime'
    )
    return new DateExtended(flexDateTime.toJSON())
  }

  /**
   *
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromUTCFlexDateTime(flexDateTime) {
    console.error("[DEPRECATED] DO NOT USE")
    const tmp = DateExtended.fromFlexDateTime(flexDateTime)
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   *
   * @return {string}
   */
  toUTCFullDate() {
    console.error("[DEPRECATED] DO NOT USE")
    return this.toISOString().split('T')[0]
  }

  /**
   *
   * @return {string}
   */
  toUTCTime() {
    console.error("[DEPRECATED] DO NOT USE")
    return this.toISOString().split('T')[1].split('Z')[0]
  }

  /**
   *
   * @return {string}
   */
  toLocaleFullDate() {
    console.error("[DEPRECATED] DO NOT USE")
    return this.getFullYear() + '-' +
      padLeft(this.getMonth() + 1, 2) + '-' +
      padLeft(this.getDate(), 2)
  }

  /**
   *
   * @return {string}
   */
  toLocaleTime() {
    console.error("[DEPRECATED] DO NOT USE")
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
    console.error("[DEPRECATED] DO NOT USE")
    return this.setMonth(this.getMonth() + 1)
  }

  /**
   * @return {number}
   */
  getPreviousMonth() {
    console.error("[DEPRECATED] DO NOT USE")
    return this.setMonth(this.getMonth() - 1)
  }

  /**
   *
   * @return {number}
   */
  getDaysInMonth() {
    console.error("[DEPRECATED] DO NOT USE")
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
  }

  getWeekNumber() {
    console.error("[DEPRECATED] DO NOT USE")
    let date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = date.getUTCDay() || 7
    date.setUTCDate(date.getUTCDate() + 4 - dayNum)
    let yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1))
    return Math.ceil((((date - yearStart) / 86400000) + 1)/7)
  }

  /**
   *
   * @returns {FlexZonedDateTime}
   */
  toUTCFlexZonedDateTime() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toISOString()
    return new FlexZonedDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toLocaleFlexDateTime() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toLocaleFullDate() + 'T' + this.toLocaleTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toUTCFlexDateTime() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toUTCFullDate() + 'T' + this.toUTCTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toLocaleFlexDate() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toLocaleFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toUTCFlexDate() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toUTCFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toLocaleFlexTime() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toLocaleTime()
    return new FlexTime(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toUTCFlexTime() {
    console.error("[DEPRECATED] DO NOT USE")
    let str = this.toUTCTime()
    return new FlexTime(str)
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexDate}
   */
  static fromStringToFlexDate(value) {
    console.error("[DEPRECATED] DO NOT USE")
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
    console.error("[DEPRECATED] DO NOT USE")
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
    console.error("[DEPRECATED] DO NOT USE")
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
