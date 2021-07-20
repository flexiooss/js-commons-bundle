import {DateExtended} from '../DateExtended'

export class DateTimeFormatter {
  /**
   * @param {FlexDateTime} flexDateTime
   * @param {string} format
   * @param {string} locale
   * @param {string} timeZone
   * @return {string}
   */
  static format(flexDateTime, format, locale, timeZone = 'UTC') {
    const date = DateExtended.fromUTCFlexDateTime(flexDateTime)
    const dateFormatter = new DateFormatHelper(date, locale, timeZone)
    switch (format) {
      case 'yyyy':
        return dateFormatter.year()
      case 'MM':
        return dateFormatter.month()
      case 'dd':
        return dateFormatter.day()
      case 'w':
        return date.getWeekNumber().toString()
      case 'HH':
        return dateFormatter.hour()
      case 'mm':
        return dateFormatter.minute()
      case 'ss':
        return dateFormatter.second()
      case 'HH:mm':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}`
      case 'HH:mm:ss':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      case 'dd MM yy':
        return `${dateFormatter.day()} ${dateFormatter.month()} ${dateFormatter.shortYear()}`
      case 'dd/MM/yyyy':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()}`
      case 'MM/dd/yyyy':
        return `${dateFormatter.month()}/${dateFormatter.day()}/${dateFormatter.year()}`
      case 'yyyy-MM-dd HH:mm:ss':
        return `${dateFormatter.year()}-${dateFormatter.month()}-${dateFormatter.day()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      case 'dd/MM/yyyy HH:mm:ss':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      case 'yyyy-MM-ddTHH:mm:ssZ':
        return `${dateFormatter.year()}-${dateFormatter.month()}-${dateFormatter.day()}T${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}Z`
      case 'json':
        return this.#getJsonDate(date)
      default:
        throw Error(`DateTimeFormatter: format ${format} not implemented yet`)
    }
  }

  /**
   * @param date
   * @return {string}
   */
  static #getJsonDate(date) {
    return `\\Date("${date.getTime()}")`
  }
}

export class DateFormatter {
  /**
   * @param {FlexDate} flexDate
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  static format(flexDate, format, locale) {
    const date = DateExtended.fromUTCFlexDate(flexDate)
    const dateFormatter = new DateFormatHelper(date, locale, 'UTC')
    switch (format) {
      case 'yyyy':
        return dateFormatter.year()
      case 'MM':
        return dateFormatter.month()
      case 'dd':
        return dateFormatter.day()
      case 'w':
        return date.getWeekNumber().toString()
      case 'dd MM yy':
        return `${dateFormatter.day()} ${dateFormatter.month()} ${dateFormatter.shortYear()}`
      case 'dd/MM/yyyy':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()}`
      case 'MM/dd/yyyy':
        return `${dateFormatter.month()}/${dateFormatter.day()}/${dateFormatter.year()}`
      default:
        throw Error(`DateTimeFormatter: format ${format} not implemented yet`)
    }
  }
}

export class TimeFormatter {
  /**
   * @param {FlexTime} flexTime
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  static format(flexTime, format, locale) {
    const dateFormatter = new DateFormatHelper(DateExtended.fromUTCFlexTime(flexTime), locale, 'UTC')
    switch (format) {
      case 'HH':
        return dateFormatter.hour()
      case 'mm':
        return dateFormatter.minute()
      case 'ss':
        return dateFormatter.second()
      case 'HH:mm':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}`
      case 'HH:mm:ss':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      default:
        throw Error(`DateTimeFormatter: format ${format} not implemented yet`)
    }
  }
}
class DateFormatHelper {
/**
  * @type {Date}
 */
#date
/**
* @type {string}
 */
#locale
/**
* @type {string}
 */
#timeZone

  /**
   * @param {Date} date
   * @param {string} locale
   * @param {string} timeZone
   */
  constructor(date, locale, timeZone) {
    this.#date = date
    this.#locale = locale
    this.#timeZone = timeZone
  }

  /**
   * @return {string}
   */
  year() {
    return this.#format({year: 'numeric'})
  }

  /**
   * @return {string}
   */
  shortYear() {
    return this.#format({year: '2-digit'})
  }

  /**
   * @return {string}
   */
  month() {
    return this.#format({month: 'numeric'}).padStart(2, '0')
  }

  /**
   * @return {string}
   */
  day() {
    return this.#format({day: 'numeric'}).padStart(2, '0')
  }

  /**
   * @return {string}
   */
  hour() {
    return parseInt(this.#format({hour: 'numeric'})).toString().padStart(2, '0')
  }

  /**
   * @return {string}
   */
  minute() {
    return this.#format({minute: 'numeric'}).padStart(2, '0')
  }

  /**
   * @return {string}
   */
  second() {
    return this.#format({second: 'numeric'}).padStart(2, '0')
  }

  /**
   * @param {Object} options
   * @return {string}
   */
  #format(options) {
    options.timeZone = this.#timeZone
    return new Intl.DateTimeFormat(this.#locale, options).format(this.#date)
  }
}