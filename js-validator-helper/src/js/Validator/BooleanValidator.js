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
    console.error('[API] BooleanValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {boolean} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('[API] BooleanValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('[API] BooleanValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   *
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('[API] BooleanValidator: no max size for `validateMaxSize`')
    return true;
  }
}
