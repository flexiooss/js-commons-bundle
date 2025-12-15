import {Validator} from './Validator.js'
import {isNull} from '../__import__assert.js'
import {TypeCheck} from '../__import__flex-types.js'

/**
 * @implements {Validator}
 */
export class DateValidator extends Validator {
  /**
   * @param {FlexDate} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexDate(value)
  }

  /**
   * @param {FlexDate} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexDate(value) && !isNull(value)
  }

  /**
   * @param {FlexDate} value
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
    console.error('DateValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {boolean} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('DateValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('DateValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('TimeValidator: no max size `validateMaxSize`')
    return true;
  }
}
