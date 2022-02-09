import {FlexDate, TypeCheck} from './__import__flex-types'
import {DateTime, Duration} from 'luxon'
import {DateFormatter, TimeFormatter} from './date-formatter/DateFormatter'

export class FlexDateExtended {
  /**
   * @type {FlexDate}
   */
  #date

  /**
   * @param {FlexDate} flexDate
   */
  constructor(flexDate) {
    TypeCheck.assertIsFlexDate(flexDate)
    this.#date = flexDate
  }

  /**
   * @return {FlexDateExtended}
   */
  static now() {
    const iso = DateTime.now().toUTC().toISODate()
    return FlexDateExtended.fromISO(iso)
  }

  /**
   * @return {DateTime}
   */
  #toDateTime() {
    return DateTime.fromISO(this.toISO())
  }

  /**
   * @param {FlexDate} flexDate
   */
  static fromFlexDate(flexDate) {
    return new FlexDateExtended(flexDate)
  }

  /**
   * @param {string} date
   * @return {FlexDateExtended}
   */
  static fromISO(date) {
    const flexDate = new FlexDate(date)
    return new FlexDateExtended(flexDate)
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
   * @param {object} object
   * @return {FlexDateExtended}
   */
  #set(object) {
    const date = this.#toDateTime().set(object).toISODate()
    return FlexDateExtended.fromISO(date)
  }

  /**
   * @param {string|number} year
   * @return {FlexDateExtended}
   */
  setYear(year) {
    return this.#set({year: year})
  }

  /**
   * @param {string|number} month
   * @return {FlexDateExtended}
   */
  setMonth(month) {
    return this.#set({month: month})
  }

  /**
   * @param {string|number} day
   * @return {FlexDateExtended}
   */
  setDay(day) {
    return this.#set({day: day})
  }

  /**
   * @param {object} object
   * @return {FlexDateExtended}
   */
  #plus(object) {
    const date = this.#toDateTime().plus(object).toISODate()
    return FlexDateExtended.fromISO(date)
  }

  /**
   * @param {string|number} years
   * @return {FlexDateExtended}
   */
  plusYears(years) {
    return this.#plus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexDateExtended}
   */
  plusMonths(months) {
    return this.#plus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexDateExtended}
   */
  plusDays(days) {
    return this.#plus({day: days})
  }

  /**
   * @param {object} object
   * @return {FlexDateExtended}
   */
  #minus(object) {
    const date = this.#toDateTime().minus(object).toISODate()
    return FlexDateExtended.fromISO(date)
  }

  /**
   * @param {string|number} years
   * @return {FlexDateExtended}
   */
  minusYears(years) {
    return this.#minus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexDateExtended}
   */
  minusMonths(months) {
    return this.#minus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexDateExtended}
   */
  minusDays(days) {
    return this.#minus({day: days})
  }

  /**
   * @param {FlexDateExtended} date
   * @return {boolean}
   */
  isBefore(date) {
    return this.#toDateTime() < DateTime.fromISO(date.toISO())
  }

  /**
   * @param {FlexDateExtended} date
   * @return {boolean}
   */
  isAfter(date) {
    return this.#toDateTime() > DateTime.fromISO(date.toISO())
  }

  /**
   * @param {FlexDateExtended} date
   * @return {boolean}
   */
  isEquals(date) {
    return this.#toDateTime().equals(DateTime.fromISO(date.toISO()))
  }

  /**
   * @return {string}
   */
  toISO() {
    return this.#date.toJSON()
  }

  /**
   * @return {FlexDate}
   */
  toFlexDate() {
    return this.#date
  }

  /**
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  format(format, locale) {
    return DateFormatter.format(this, format, locale)
  }
}
