import {Validator} from '../Validator.js'
import {isNull} from '../../__import__assert.js'

/**
 * @implements {Validator}
 */
export class ListValidator extends Validator {

  /**
   *
   * @param {Array} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   *
   * @param {Array} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value) && value.length > 0
  }

  /**
   *
   * @param {Array} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('ListValidator: no range for `validateInRange`')
  }

  /**
   *
   * @param {Array} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('ListValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   *
   * @param {Array} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('ListValidator: no regex for `validateRegex`')
  }
}
