import {assert, assertType, isNull} from './__import__assert'


const datetimePattern = /^((-\d{6})|(\d{4}))-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?$/
const zonedDatetimePattern = /^((-\d{6})|(\d{4}))-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z|([+-](\d{2}):(\d{2})))$/
const datePattern = /^((-\d{6})|(\d{4}))-(\d{2})-(\d{2})$/
const timePattern = /^(\d{2}):(\d{2}):(\d{2})(\.(\d*))?(Z)?/


export class FlexZonedDateTime {
  constructor(dateStr) {
    let found = dateStr.match(zonedDatetimePattern)
    assert(!isNull(found), 'Invalid tz datetime format: ' + dateStr)
    /**
     *
     * @type {string}
     * @private
     */
    this.__zonedDateTime = dateStr
  }

  /**
   *
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   *
   * @return {string}
   */
  toString() {
    return this.__zonedDateTime
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
  constructor(dateStr) {
    let found = dateStr.match(datetimePattern)
    assert(!isNull(found), 'Invalid datetime format: ' + dateStr)
    /**
     *
     * @type {string}
     * @private
     */
    this.__dateTime = dateStr.split('Z')[0]
  }

  /**
   *
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   *
   * @return {string}
   */
  toString() {
    return this.__dateTime
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
  constructor(dateStr) {
    let found = dateStr.match(datePattern)
    assert(!isNull(found), 'Invalid date format: ' + dateStr)
    /**
     *
     */
    this.__date = dateStr
  }

  /**
   *
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   *
   * @return {string}
   */
  toString() {
    return this.__date
  }

  /**
   *
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
  constructor(dateStr) {
    let found = dateStr.match(timePattern)
    assert(!isNull(found), 'Invalid time format: ' + dateStr)
    /**
     *
     * @type {string}
     * @private
     */
    this.__time = dateStr.split('Z')[0]
  }

  /**
   *
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   *
   * @return {string}
   */
  toString() {
    return this.__time
  }

  /**
   *
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
 *
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
