import {Validator} from './Validator.js'
import {isNull, isBoolean} from '../__import__assert.js'

/**
 * @implements {Validator}
 */
export class BooleanValidator extends Validator {
  /**
   * @param {string} value
   * @return {boolean}
   */
  validateType(value) {
    return isBoolean(value)
  }

  /**
   * @param {boolean} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return isBoolean(value) && !isNull(value)
  }

  /**
   * @param {boolean} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {boolean} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('BooleanValidator: no range for `validateInRange`')
  }

  /**
   * @param {boolean} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('BooleanValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('BooleanValidator: no regex for `validateRegex`')
  }

  /**
   *
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    throw new Error('BooleanValidator: no max size for `validateMaxSize`')
  }
}
