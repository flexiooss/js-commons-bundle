import { assertType, isNull} from './__import__assert.js'
import {BaseException} from '../../../js-type-helpers/index.js'

const datetimePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?$/
const zonedDatetimePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z|([+-](\d{2}):(\d{2})))$/
const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/
const timePattern = /^(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z)?/

export class DateTimeParseException extends BaseException {
  realName() {
    return 'DateTimeParseException'
  }

  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_DATE(value){
    return new DateTimeParseException(`Invalid date parse input: ${value}`)
  }
  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_DATETIME(value){
    return new DateTimeParseException(`Invalid date time parse input: ${value}`)
  }
  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_ZONED_DATETIME(value){
    return new DateTimeParseException(`Invalid zoned date time parse input: ${value}`)
  }
  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_TIME(value){
    return new DateTimeParseException(`Invalid time parse input: ${value}`)
  }
}

export class FlexZonedDateTime {
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    let found = dateStr.match(zonedDatetimePattern)
    if(isNull(found)){
      throw  DateTimeParseException.FROM_ZONED_DATETIME(dateStr)
    }
    this.#value = dateStr
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
    return this.#value
  }

  /**
   *
   * @param {FlexZonedDateTime} to
   * @return {boolean}
   */
  equals(to) {
    return equals(this, to, (to) => {
      assertType(
        to instanceof FlexZonedDateTime,
        '`to` should be FlexZonedDateTime'
      )
    })

  }
}


export class FlexDateTime {
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    let found = dateStr.match(datetimePattern)
    if(isNull(found)){
      throw  DateTimeParseException.FROM_DATETIME(dateStr)
    }
    this.#value = dateStr.split('Z')[0]
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
    return this.#value
  }

  /**
   *
   * @param {FlexDateTime} to
   * @return {boolean}
   */
  equals(to) {
    return equals(this, to, (to) => {
      assertType(
        to instanceof FlexDateTime,
        '`to` should be FlexDateTime'
      )
    })

  }
}


export class FlexDate {
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    let found = dateStr.match(datePattern)
    if(isNull(found)){
      throw  DateTimeParseException.FROM_DATE(dateStr)
    }
    this.#value = dateStr
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
    return this.#value
  }

  /**
   * @param {FlexDate} to
   * @return {boolean}
   */
  equals(to) {
    return equals(this, to, (to) => {
      assertType(
        to instanceof FlexDate,
        '`to` should be FlexDate'
      )
    })

  }
}


export class FlexTime {
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    let found = dateStr.match(timePattern)
    if(isNull(found)){
      throw  DateTimeParseException.FROM_TIME(dateStr)
    }
    this.#value = dateStr.split('Z')[0]
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
    return this.#value
  }

  /**
   * @param {FlexTime} to
   * @return {boolean}
   */
  equals(to) {
    return equals(this, to, (to) => {
      assertType(
        to instanceof FlexTime,
        '`to` should be FlexTime'
      )
    })

  }
}


/**
 * @param from
 * @param to
 * @param {function(to)} typeCheck
 * @return {boolean}
 */
const equals = (from, to, typeCheck) => {
  if (isNull(to)) {
    return false
  }

  typeCheck(to)

  if (to == from) {
    return true
  }
  return to.toString() === from.toString()
}
