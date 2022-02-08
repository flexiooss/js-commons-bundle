import {FlexTime, TypeCheck} from './__import__flex-types'
import {DateTime, Duration} from 'luxon'
import {TimeFormatter} from './date-formatter/DateFormatter'

export class FlexTimeExtended {
  /**
   * @type {FlexTime}
   */
  #time

  constructor(flexTime) {
    TypeCheck.assertIsFlexTime(flexTime)
    this.#time = flexTime
  }

  /**
   * @return {FlexTimeExtended}
   */
  static now() {
    const iso = DateTime.now().toUTC().toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(iso)
  }

  /**
   * @return {DateTime}
   */
  #toDateTime() {
    return DateTime.fromISO(this.toISO())
  }

  /**
   * @param {FlexTime} flexTime
   */
  static fromFlexTime(flexTime) {
    return new FlexTimeExtended(flexTime)
  }

  /**
   * @param {string} date
   * @return {FlexTimeExtended}
   */
  static fromISO(date) {
    const flexTime = new FlexTime(date)
    return new FlexTimeExtended(flexTime)
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
   * @return {FlexTimeExtended}
   */
  #set(object) {
    const time = this.#toDateTime().set(object).toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(time)
  }

  /**
   * @param {string|number} hours
   * @return {FlexTimeExtended}
   */
  setHours(hours) {
    return this.#set({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  setMinutes(minutes) {
    return this.#set({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  setSeconds(seconds) {
    return this.#set({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  setMilliseconds(milliseconds) {
    return this.#set({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexTimeExtended}
   */
  #plus(object) {
    const time = this.#toDateTime().plus(object)
      .toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(time)
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {FlexTimeExtended}
   */
  plusTime(time) {
    const duration = Duration.fromISOTime(time.toISO())
    const plus = this.#toDateTime().plus(duration)
      .toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(plus)
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {FlexTimeExtended}
   */
  minusTime(time) {
    const duration = Duration.fromISOTime(time.toISO())
    const plus = this.#toDateTime().minus(duration)
      .toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(plus)
  }

  /**
   * @param {string|number} hours
   * @return {FlexTimeExtended}
   */
  plusHours(hours) {
    return this.#plus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  plusMinutes(minutes) {
    return this.#plus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  plusSeconds(seconds) {
    return this.#plus({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  plusMilliseconds(milliseconds) {
    return this.#plus({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexTimeExtended}
   */
  #minus(object) {
    const time = this.#toDateTime().minus(object)
      .toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(time)
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
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  minusMilliseconds(milliseconds) {
    return this.#minus({millisecond: milliseconds})
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {boolean}
   */
  isBefore(time) {
    return this.#toDateTime() < DateTime.fromISO(time.toISO())
  }

  isAfter(time) {
    return this.#toDateTime() > DateTime.fromISO(time.toISO())
  }

  isEquals(time) {
    return this.#toDateTime().equals(DateTime.fromISO(time.toISO()))
  }

  /**
   * @return {string}
   */
  toISO() {
    return this.#time.toJSON()
  }

  /**
   * @return {FlexTime}
   */
  toFlexTime() {
    return this.#time
  }

  /**
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  format(format, locale) {
    return TimeFormatter.format(this.toFlexTime(), format, locale)
  }
}
