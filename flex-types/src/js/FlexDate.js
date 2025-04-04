import {assertType, isNull} from './__import__assert.js'
import {BaseException} from '../../../js-type-helpers/index.js'
import {haveEquals} from "../../../js-generator-helpers/index.js";

export class DateTimeParseException extends BaseException {
  realName() {
    return 'DateTimeParseException'
  }

  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_DATE(value) {
    return new DateTimeParseException(`Invalid date parse input: ${value}`)
  }

  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_DATETIME(value) {
    return new DateTimeParseException(`Invalid date time parse input: ${value}`)
  }

  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_ZONED_DATETIME(value) {
    return new DateTimeParseException(`Invalid zoned date time parse input: ${value}`)
  }

  /**
   * @param {string} value
   * @return {DateTimeParseException}
   * @constructor
   */
  static FROM_TIME(value) {
    return new DateTimeParseException(`Invalid time parse input: ${value}`)
  }
}

/**
 * @implement HaveEquals
 */
export class FlexZonedDateTime extends haveEquals() {
  /**
   * @type {RegExp}
   */
  static PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z|([+-](\d{2}):(\d{2})))$/;
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    super()
    let found = dateStr.match(FlexZonedDateTime.PATTERN)
    if (isNull(found)) {
      throw DateTimeParseException.FROM_ZONED_DATETIME(dateStr)
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

/**
 * @implement HaveEquals
 */
export class FlexDateTime extends haveEquals() {
  /**
   * @type {RegExp}
   */
  static PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z)?$/;
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    super()
    let found = dateStr.match(FlexDateTime.PATTERN)
    if (isNull(found)) {
      throw DateTimeParseException.FROM_DATETIME(dateStr)
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

/**
 * @implement HaveEquals
 */
export class FlexDate extends haveEquals() {
  /**
   * @type {RegExp}
   */
  static PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    super()
    let found = dateStr.match(FlexDate.PATTERN)
    if (isNull(found)) {
      throw DateTimeParseException.FROM_DATE(dateStr)
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

/**
 * @implement HaveEquals
 */
export class FlexTime extends haveEquals() {
  /**
   * @type {RegExp}
   */
  static PATTERN = /^(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z)?/;
  /**
   * @type {string}
   */
  #value

  /**
   * @param {string} dateStr
   * @throws {DateTimeParseException}
   */
  constructor(dateStr) {
    super()
    let found = dateStr.match(FlexTime.PATTERN);
    if (isNull(found)) {
      throw DateTimeParseException.FROM_TIME(dateStr)
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
