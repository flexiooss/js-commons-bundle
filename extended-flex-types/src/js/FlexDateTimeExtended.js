import {FlexDateTime, TypeCheck} from './__import__flex-types'
import {DateTime} from 'luxon'
import {DateTimeFormatter} from './date-formatter/DateFormatter'
import {FlexDateExtended} from './FlexDateExtended'
import {FlexTimeExtended} from './FlexTimeExtended'

export class FlexDateTimeExtended {
  /**
   * @type {FlexDateTime}
   */
  #datetime

  /**
   * @param {FlexDateTime} flexDateTime
   */
  constructor(flexDateTime) {
    TypeCheck.assertIsFlexDateTime(flexDateTime)
    this.#datetime = flexDateTime
  }

  /**
   * @return {FlexDateTimeExtended}
   */
  static now() {
    const iso = DateTime.now().toUTC().toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(iso)
  }

  /**
   * @param {FlexDateTime} flexDateTime
   */
  static fromFlexDateTime(flexDateTime) {
    return new FlexDateTimeExtended(flexDateTime)
  }

  /**
   * @param {string} datetime
   * @param {string} timeZone
   * @return {FlexDateTimeExtended}
   */
  static fromISO(datetime, timeZone = 'utc') {
    const clean = datetime.endsWith('Z') ? datetime.replace('Z', '') : datetime
    const dt = DateTime.fromISO(clean, {zone: timeZone})
    const iso = dt.toUTC().toISO({includeOffset: false})
    const flexDateTime = new FlexDateTime(iso)
    return new FlexDateTimeExtended(flexDateTime)
  }

  /**
   * @param {number} millis
   * @return {FlexDateTimeExtended}
   */
  static fromMillis(millis) {
    const iso = DateTime.fromMillis(millis, {zone: 'utc'}).toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(iso)
  }

  /**
   * @param {number} seconds
   * @return {FlexDateTimeExtended}
   */
  static fromSeconds(seconds) {
    const iso = DateTime.fromSeconds(seconds, {zone: 'utc'}).toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(iso)
  }

  /**
   * @param {number} year
   * @param {number} month
   * @return {number}
   */
  static getDaysInMonth(year, month) {
    return FlexDateExtended.getDaysInMonth(year, month)
  }

  /**
   * @return {DateTime}
   */
  #toDateTime() {
    return DateTime.fromISO(this.toISO(), {zone: 'utc'})
  }

  /**
   * @return {number}
   */
  years() {
    return this.#toDateTime().year
  }

  /**
   * 1 - 12
   * @return {number}
   */
  months() {
    return this.#toDateTime().month
  }

  /**
   * 1 - 31
   * @return {number}
   */
  days() {
    return this.#toDateTime().day
  }

  /**
   * @return {number}
   */
  hours() {
    return this.#toDateTime().hour
  }

  /**
   * @return {number}
   */
  minutes() {
    return this.#toDateTime().minute
  }

  /**
   * @return {number}
   */
  seconds() {
    return this.#toDateTime().second
  }

  /**
   * @return {number}
   */
  milliseconds() {
    return this.#toDateTime().millisecond
  }

  /**
   * 1 - 52
   * @return {number}
   */
  weekNumber() {
    return this.#toDateTime().weekNumber
  }

  /**
   * 1-7 1 is Monday and 7 is Sunday
   * @return {number}
   */
  weekDay() {
    return this.#toDateTime().weekday
  }

  /**
   * @param {object} object
   * @return {FlexDateTimeExtended}
   */
  #set(object) {
    const datetime = this.#toDateTime().set(object).toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(datetime)
  }

  /**
   * @param {string|number} year
   * @return {FlexDateTimeExtended}
   */
  setYear(year) {
    return this.#set({year: year})
  }

  /**
   * @param {string|number} month
   * @return {FlexDateTimeExtended}
   */
  setMonth(month) {
    return this.#set({month: month})
  }

  /**
   * @param {string|number} day
   * @return {FlexDateTimeExtended}
   */
  setDay(day) {
    return this.#set({day: day})
  }

  /**
   * @param {string|number} hours
   * @return {FlexDateTimeExtended}
   */
  setHour(hours) {
    return this.#set({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexDateTimeExtended}
   */
  setMinute(minutes) {
    return this.#set({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexDateTimeExtended}
   */
  setSecond(seconds) {
    return this.#set({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexDateTimeExtended}
   */
  setMilliseconds(milliseconds) {
    return this.#set({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexDateTimeExtended}
   */
  #plus(object) {
    const datetime = this.#toDateTime().plus(object).toUTC().toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(datetime)
  }

  /**
   * @param {string|number} years
   * @return {FlexDateTimeExtended}
   */
  plusYears(years) {
    return this.#plus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexDateTimeExtended}
   */
  plusMonths(months) {
    return this.#plus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexDateTimeExtended}
   */
  plusDays(days) {
    return this.#plus({day: days})
  }

  /**
   * @param {string|number} hours
   * @return {FlexDateTimeExtended}
   */
  plusHours(hours) {
    return this.#plus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexDateTimeExtended}
   */
  plusMinutes(minutes) {
    return this.#plus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexDateTimeExtended}
   */
  plusSeconds(seconds) {
    return this.#plus({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexDateTimeExtended}
   */
  plusMilliseconds(milliseconds) {
    return this.#plus({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexDateTimeExtended}
   */
  #minus(object) {
    const datetime = this.#toDateTime().minus(object).toISO({includeOffset: false})
    return FlexDateTimeExtended.fromISO(datetime)
  }

  /**
   * @param {string|number} years
   * @return {FlexDateTimeExtended}
   */
  minusYears(years) {
    return this.#minus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexDateTimeExtended}
   */
  minusMonths(months) {
    return this.#minus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexDateTimeExtended}
   */
  minusDays(days) {
    return this.#minus({day: days})
  }

  /**
   * @param {string|number} hours
   * @return {FlexDateTimeExtended}
   */
  minusHours(hours) {
    return this.#minus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexDateTimeExtended}
   */
  minusMinutes(minutes) {
    return this.#minus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexDateTimeExtended}
   */
  minusSeconds(seconds) {
    return this.#minus({second: seconds})
  }

  /**
   * @param {string|number} millisecond
   * @return {FlexDateTimeExtended}
   */
  minusMilliseconds(millisecond) {
    return this.#minus({millisecond: millisecond})
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isBefore(datetime) {
    return this.#toDateTime() < DateTime.fromISO(datetime.toISO(), {zone: 'utc'})
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isAfter(datetime) {
    return this.#toDateTime() > DateTime.fromISO(datetime.toISO(), {zone: 'utc'})
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isEquals(datetime) {
    return this.#toDateTime().equals(DateTime.fromISO(datetime.toISO(), {zone: 'utc'}))
  }

  /**
   * @return {string}
   */
  toISO() {
    return this.#datetime.toJSON()
  }

  /**
   * @return {FlexDateTime}
   */
  toFlexDateTime() {
    return this.#datetime
  }

  /**
   * @return {number}
   */
  toSeconds() {
    return DateTime.fromISO(this.#datetime.toJSON(), {zone: 'UTC'}).toSeconds()
  }

  /**
   * @return {number}
   */
  toMillis() {
    return DateTime.fromISO(this.#datetime.toJSON(), {zone: 'UTC'}).toMillis()
  }

  /**
   * @return {FlexDateExtended}
   */
  toDate() {
    return FlexDateExtended.fromISO(this.#toDateTime().toISODate())
  }

  /**
   * @return {FlexTimeExtended}
   */
  toTime() {
    return FlexTimeExtended.fromISO(this.#toDateTime().toISOTime({includeOffset: false}))
  }

  /**
   * @param {string} format
   * @param {string} locale
   * @param {string} [timeZone=UTC]
   * @return {string}
   */
  format(format, locale, timeZone) {
    return DateTimeFormatter.format(this, format, locale, timeZone)
  }
}
