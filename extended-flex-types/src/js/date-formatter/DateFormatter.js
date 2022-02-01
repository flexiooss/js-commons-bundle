import {DateExtended} from '../DateExtended'
import {isNull} from '../../../../assert'

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
        return `${dateFormatter.year('UTC')}-${dateFormatter.month('UTC')}-${dateFormatter.day('UTC')}T${dateFormatter.hour('UTC')}:${dateFormatter.minute('UTC')}:${dateFormatter.second('UTC')}Z`
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
    return `/Date(${date.getTime()})/`
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
        throw Error(`DateFormatter: format ${format} not implemented yet`)
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
        throw Error(`TimeFormatter: format ${format} not implemented yet`)
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
   * @param {?string} timeZone
   * @return {string}
   */
  year(timeZone = null) {
    return this.#format({year: 'numeric'}, timeZone || this.#timeZone)
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  shortYear(timeZone = null) {
    return this.#format({year: '2-digit'}, timeZone || this.#timeZone)
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  month(timeZone = null) {
    return this.#format({month: 'numeric'}, timeZone || this.#timeZone).padStart(2, '0')
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  day(timeZone = null) {
    return this.#format({day: 'numeric'}, timeZone || this.#timeZone).padStart(2, '0')
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  hour(timeZone = null) {
    return parseInt(this.#format({hour: 'numeric'}, timeZone || this.#timeZone)).toString().padStart(2, '0')
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  minute(timeZone = null) {
    return this.#format({minute: 'numeric'}, timeZone || this.#timeZone).padStart(2, '0')
  }

  /**
   * @param {?string} timeZone
   * @return {string}
   */
  second(timeZone = null) {
    return this.#format({second: 'numeric'}, timeZone || this.#timeZone).padStart(2, '0')
  }

  /**
   * @param {Object} options
   * @param {string} timeZone
   * @return {string}
   */
  #format(options, timeZone) {
    if (!isNull(timeZone)) {
      options.timeZone = timeZone
    }
    return new Intl.DateTimeFormat(this.#locale, options).format(this.#date)
  }
}
