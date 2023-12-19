import {FlexDateTime, FlexZonedDateTime, TypeCheck} from './__import__flex-types.js'
import {DateTime} from 'luxon'
import {DateTimeFormatter} from './date-formatter/DateFormatter.js'
import {FlexDateExtended} from './FlexDateExtended.js'
import {FlexTimeExtended} from './FlexTimeExtended.js'
import {FlexDateTimeExtended} from './FlexDateTimeExtended.js'

export class FlexZonedDateTimeExtended {
  /**
   * @type {FlexDateTime}
   */
  #datetime

  /**
   * @type {string}
   */
  #timezone

  /**
   * @param {FlexDateTime} flexDateTime
   * @param {string} timezone
   */
  constructor(flexDateTime, timezone) {
    TypeCheck.assertIsFlexDateTime(flexDateTime)
    this.#datetime = flexDateTime
    this.#timezone = timezone
  }


  /**
   * @param {FlexZonedDateTime} dateTime
   * @returns {FlexZonedDateTimeExtended}
   */
  static fromFlexZonedDateTime(dateTime) {
    const dt = DateTime.fromISO(dateTime.toString())
    const iso = dt.toUTC().toISO({includeOffset: false})
    const flexDateTime = new FlexDateTime(iso)
    return new FlexZonedDateTimeExtended(flexDateTime, dt.zoneName)
  }

  /**
   * @param {FlexDateTime} flexDateTime
   * @param {string} timezone
   * @returns {FlexZonedDateTimeExtended}
   */
  static fromFlexDateTime(flexDateTime, timezone = 'utc') {
    const dateTime = DateTime.fromISO(flexDateTime.toJSON(), {zone: timezone})
    const iso = dateTime.toUTC().toISO({includeOffset: false})
    const dt = new FlexDateTime(iso)

    return new FlexZonedDateTimeExtended(dt, dateTime.zoneName)
  }

  /**
   * ISO format need an offset ! Or it takes the executor timezone
   * @param {string} datetime
   * @returns {FlexZonedDateTimeExtended}
   */
  static fromISO(datetime) {
    new FlexZonedDateTime(datetime) //  ISO need an offset !
    const dt = DateTime.fromISO(datetime, {setZone: true})
    const iso = dt.toUTC().toISO({includeOffset: false})
    const flexDateTime = new FlexDateTime(iso)
    console.log(dt.zoneName)

    return new FlexZonedDateTimeExtended(flexDateTime, dt.zoneName)
  }

  /**
   * @return {DateTime}
   */
  #toDateTime() {
    return DateTime.fromISO(this.#datetime.toJSON(), {zone: 'utc'}).setZone(this.#timezone)
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
   * @return {number}
   */
  dayOfYear() {
    return this.#toDateTime().ordinal
  }

  /**
   * @param {object} object
   * @return {FlexZonedDateTimeExtended}
   */
  #set(object) {
    const res = this.#toDateTime().set(object)
    const iso = res.toISO({includeOffset: false})
    const dt = new FlexDateTime(iso)
    return FlexZonedDateTimeExtended.fromFlexDateTime(dt, this.#timezone)
  }

  /**
   * @param {string|number} year
   * @return {FlexZonedDateTimeExtended}
   */
  setYear(year) {
    return this.#set({year: year})
  }

  /**
   * @param {string|number} month
   * @return {FlexZonedDateTimeExtended}
   */
  setMonth(month) {
    return this.#set({month: month})
  }

  /**
   * @param {string|number} day
   * @return {FlexZonedDateTimeExtended}
   */
  setDay(day) {
    return this.#set({day: day})
  }

  /**
   * @param {string|number} hours
   * @return {FlexZonedDateTimeExtended}
   */
  setHour(hours) {
    return this.#set({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexZonedDateTimeExtended}
   */
  setMinute(minutes) {
    return this.#set({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexZonedDateTimeExtended}
   */
  setSecond(seconds) {
    return this.#set({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexZonedDateTimeExtended}
   */
  setMilliseconds(milliseconds) {
    return this.#set({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexZonedDateTimeExtended}
   */
  #plus(object) {
    const res = this.#toDateTime().plus(object)
    const iso = res.toISO({includeOffset: false})
    const dt = new FlexDateTime(iso)

    return FlexZonedDateTimeExtended.fromFlexDateTime(dt, this.#timezone)
  }

  /**
   * @param {string|number} years
   * @return {FlexZonedDateTimeExtended}
   */
  plusYears(years) {
    return this.#plus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexZonedDateTimeExtended}
   */
  plusMonths(months) {
    return this.#plus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexZonedDateTimeExtended}
   */
  plusDays(days) {
    return this.#plus({day: days})
  }

  /**
   * @param {string|number} hours
   * @return {FlexZonedDateTimeExtended}
   */
  plusHours(hours) {
    return this.#plus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexZonedDateTimeExtended}
   */
  plusMinutes(minutes) {
    return this.#plus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexZonedDateTimeExtended}
   */
  plusSeconds(seconds) {
    return this.#plus({second: seconds})
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexZonedDateTimeExtended}
   */
  plusMilliseconds(milliseconds) {
    return this.#plus({millisecond: milliseconds})
  }

  /**
   * @param {object} object
   * @return {FlexZonedDateTimeExtended}
   */
  #minus(object) {
    const res = this.#toDateTime().minus(object)
    const iso = res.toISO({includeOffset: false})
    const dt = new FlexDateTime(iso)
    return FlexZonedDateTimeExtended.fromFlexDateTime(dt, this.#timezone)
  }

  /**
   * @param {string|number} years
   * @return {FlexZonedDateTimeExtended}
   */
  minusYears(years) {
    return this.#minus({year: years})
  }

  /**
   * @param {string|number} months
   * @return {FlexZonedDateTimeExtended}
   */
  minusMonths(months) {
    return this.#minus({month: months})
  }

  /**
   * @param {string|number} days
   * @return {FlexZonedDateTimeExtended}
   */
  minusDays(days) {
    return this.#minus({day: days})
  }

  /**
   * @param {string|number} hours
   * @return {FlexZonedDateTimeExtended}
   */
  minusHours(hours) {
    return this.#minus({hour: hours})
  }

  /**
   * @param {string|number} minutes
   * @return {FlexZonedDateTimeExtended}
   */
  minusMinutes(minutes) {
    return this.#minus({minute: minutes})
  }

  /**
   * @param {string|number} seconds
   * @return {FlexZonedDateTimeExtended}
   */
  minusSeconds(seconds) {
    return this.#minus({second: seconds})
  }

  /**
   * @param {string|number} millisecond
   * @return {FlexZonedDateTimeExtended}
   */
  minusMilliseconds(millisecond) {
    return this.#minus({millisecond: millisecond})
  }

  /**
   * @param {FlexZonedDateTimeExtended} datetime
   * @return {boolean}
   */
  isBefore(datetime) {
    return this.#toDateTime() < DateTime.fromISO(datetime.toISO(), {zone: this.#timezone})
  }

  /**
   * @param {FlexZonedDateTimeExtended} datetime
   * @return {boolean}
   */
  isAfter(datetime) {
    return this.#toDateTime() > DateTime.fromISO(datetime.toISO(), {zone: this.#timezone})
  }

  /**
   * @param {FlexZonedDateTimeExtended} datetime
   * @return {boolean}
   */
  isEquals(datetime) {
    return this.#toDateTime().equals(DateTime.fromISO(datetime.toISO(), {zone: this.#timezone}))
  }

  /**
   * @return {string}
   */
  toISO() {
    return this.#toDateTime().toISO()
  }

  /**
   * @return {FlexDateTime}
   */
  toUTCFlexDateTime() {
    return this.#datetime
  }

  /**
   * @returns {string}
   */
  timezone() {
    return this.#timezone
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
   * @returns {FlexDateTimeExtended}
   */
  toUTCDateTime() {
    return new FlexDateTimeExtended(this.#datetime)
  }

  /**
   * @return {FlexDateExtended}
   */
  toUTCDate() {
    return FlexDateExtended.fromISO(this.#toDateTime().toUTC().toISODate())
  }

  /**
   * @return {FlexTimeExtended}
   */
  toUTCTime() {
    return FlexTimeExtended.fromISO(this.#toDateTime().toUTC().toISOTime({includeOffset: false}))
  }

  /**
   * @return {FlexDateExtended}
   */
  toLocalDate() {
    return FlexDateExtended.fromISO(this.#toDateTime().toISODate())
  }

  /**
   * @return {FlexTimeExtended}
   */
  toLocalTime() {
    return FlexTimeExtended.fromISO(this.#toDateTime().toISOTime({includeOffset: false}))
  }

  /**
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   * @return {string}
   */
  toString() {
    return this.#toDateTime().toISO()
  }

  /**
   * @param {String} timezone
   * @returns {FlexZonedDateTimeExtended}
   */
  atZoneSameInstant(timezone) {
    return new FlexZonedDateTimeExtended(this.#datetime, timezone)
  }


  /**
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  format(format, locale) {
    const flexDateTime = this.toUTCDateTime()
    return DateTimeFormatter.format(flexDateTime, format, locale, this.#timezone)
  }
}
