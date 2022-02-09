import {FlexDateTime, TypeCheck} from './__import__flex-types'
import {DateTime} from 'luxon'
import {DateTimeFormatter} from './date-formatter/DateFormatter'

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
   * @return {DateTime}
   */
  #toDateTime() {
    return DateTime.fromISO(this.toISO())
  }

  /**
   * @param {FlexDateTime} flexDateTime
   */
  static fromFlexDateTime(flexDateTime) {
    return new FlexDateTimeExtended(flexDateTime)
  }

  /**
   * @param {string} datetime
   * @return {FlexDateTimeExtended}
   */
  static fromISO(datetime) {
    const flexDateTime = new FlexDateTime(datetime)
    return new FlexDateTimeExtended(flexDateTime)
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
   * 1 - 30
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
    const datetime = this.#toDateTime().plus(object).toISO({includeOffset: false})
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
   * @return {FlexTimeExtended}
   */
  minusHours(hours) {
    return this.#minus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  minusMinutes(minutes) {
    return this.#minus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  minusSeconds(seconds) {
    return this.#minus({second: seconds})
  }

  /**
   * @param {string|number} millisecond
   * @return {FlexTimeExtended}
   */
  minusMilliseconds(millisecond) {
    return this.#minus({millisecond: millisecond})
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isBefore(datetime) {
    return this.#toDateTime() < DateTime.fromISO(datetime.toISO())
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isAfter(datetime) {
    return this.#toDateTime() > DateTime.fromISO(datetime.toISO())
  }

  /**
   * @param {FlexDateTimeExtended} datetime
   * @return {boolean}
   */
  isEquals(datetime) {
    return this.#toDateTime().equals(DateTime.fromISO(datetime.toISO()))
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
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  format(format, locale) {
    return DateTimeFormatter.format(this, format, locale)
  }
}
