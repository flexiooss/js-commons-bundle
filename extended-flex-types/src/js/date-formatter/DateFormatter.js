import {formatType, isDate, isNull} from '../../../../assert/index.js'
import {DateTime} from 'luxon'

export class DateTimeFormatter {
  /**
   * @param {FlexDateTimeExtended} dateTime
   * @param {string} format
   * @param {string} locale
   * @param {string} timeZone
   * @return {string}
   */
  static format(dateTime, format, locale, timeZone = 'UTC') {
    const date = new Date(dateTime.toISO() + 'Z')
    if (!isDate(date)){
      throw new TypeError(`DateTimeFormatter: should have date given::${formatType(date)} from ${formatType(dateTime)}`)
    }
    const dateFormatter = new DateFormatHelper(date, locale, timeZone)

    switch (format) {
      case 'yyyy':
        return dateFormatter.year()
      case 'MM':
        return dateFormatter.month()
      case 'dd':
        return dateFormatter.day()
      case 'w':
        return `${dateTime.weekNumber()}`
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
      case 'HH:mm:ss.SSS':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}.${dateFormatter.millis()}`
      case 'dd MM yy':
        return `${dateFormatter.day()} ${dateFormatter.month()} ${dateFormatter.shortYear()}`
      case 'dd/MM/yyyy':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()}`
      case 'MM/dd/yyyy':
        return `${dateFormatter.month()}/${dateFormatter.day()}/${dateFormatter.year()}`
      case 'yyyy-MM-dd HH:mm:ss':
        return `${dateFormatter.year()}-${dateFormatter.month()}-${dateFormatter.day()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      case 'yyyy-MM-dd HH:mm:ss.SSS':
        return `${dateFormatter.year()}-${dateFormatter.month()}-${dateFormatter.day()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}.${dateFormatter.millis()}`
      case 'dd/MM/yyyy HH:mm:ss':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}`
      case 'dd/MM/yyyy HH:mm:ss.SSS':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()} ${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}.${dateFormatter.millis()}`
      case 'yyyy-MM-ddTHH:mm:ssZ':
        return `${dateFormatter.year('UTC')}-${dateFormatter.month('UTC')}-${dateFormatter.day('UTC')}T${dateFormatter.hour('UTC')}:${dateFormatter.minute('UTC')}:${dateFormatter.second('UTC')}Z`
      case 'yyyy-MM-ddTHH:mm:ss.SSSZ':
        return `${dateFormatter.year('UTC')}-${dateFormatter.month('UTC')}-${dateFormatter.day('UTC')}T${dateFormatter.hour('UTC')}:${dateFormatter.minute('UTC')}:${dateFormatter.second('UTC')}.${dateFormatter.millis('UTC')}Z`
      case 'json':
        return `/Date(${date.getTime()})/`
      default:
        return DateTime.fromISO(date.toISOString()).setZone(timeZone).setLocale(locale).toFormat(format)
    }
  }
}

export class DateFormatter {
  /**
   * @param {FlexDateExtended} date
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  static format(date, format, locale) {
    const datetime = Date.UTC(date.years(), date.months()-1, date.days(), 0, 0, 0, 0)
    const dt = new Date(datetime)
    if (!isDate(dt)){
      throw new TypeError(`DateFormatter: should have date given::${formatType(dt)} from ${formatType(date)}`)
    }
    const dateFormatter = new DateFormatHelper(dt, locale, 'utc')

    switch (format) {
      case 'yyyy':
        return dateFormatter.year()
      case 'MM':
        return dateFormatter.month()
      case 'dd':
        return dateFormatter.day()
      case 'w':
        return `${date.weekNumber()}`
      case 'dd MM yy':
        return `${dateFormatter.day()} ${dateFormatter.month()} ${dateFormatter.shortYear()}`
      case 'dd/MM/yyyy':
        return `${dateFormatter.day()}/${dateFormatter.month()}/${dateFormatter.year()}`
      case 'MM/dd/yyyy':
        return `${dateFormatter.month()}/${dateFormatter.day()}/${dateFormatter.year()}`
      default:
        return DateTime.fromISO(dt.toISOString()).setZone('UTC').setLocale(locale).toFormat(format)
    }
  }
}

export class TimeFormatter {
  /**
   * @param {FlexTimeExtended} time
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  static format(time, format, locale) {
    const date = Date.UTC(2000, 0, 1, time.hours(), time.minutes(), time.seconds(), time.milliseconds())
    const dt = new Date(date)
    if (!isDate(dt)){
      throw new TypeError(`TimeFormatter: should have date given::${formatType(dt)} from ${formatType(date)}`)
    }
    const dateFormatter = new DateFormatHelper(dt, locale, 'UTC')

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
      case 'HH:mm:ss.SSS':
        return `${dateFormatter.hour()}:${dateFormatter.minute()}:${dateFormatter.second()}.${dateFormatter.millis()}`
      default:
        return DateTime.fromISO(dt.toISOString()).setZone('UTC').setLocale(locale).toFormat(format)
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
   * @param {?string} timeZone
   * @return {string}
   */
  millis(timeZone = null) {
    return this.#format({fractionalSecondDigits: 3}, timeZone || this.#timeZone).padStart(3, '0')
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
