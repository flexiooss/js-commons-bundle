import {Validator} from './Validator.js'
import {isNull} from '../__import__assert.js'
import {TypeCheck} from '../__import__flex-types.js'

/**
 * @implements {Validator}
 */
export class DateTimeValidator extends Validator {
  /**
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexDateTime(value)
  }

  /**
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexDateTime(value) && !isNull(value)
  }

  /**
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {FlexDateTime} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    console.error('DateTimeValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {FlexDateTime} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('DateTimeValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {FlexDateTime} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('DateTimeValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('DateTimeValidator: no max size `validateMaxSize`')
    return true;
  }
}
