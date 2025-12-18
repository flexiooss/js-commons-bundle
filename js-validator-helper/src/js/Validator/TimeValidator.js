import {Validator} from './Validator.js'
import {isNull} from '../__import__assert.js'
import {TypeCheck} from '../__import__flex-types.js'

/**
 * @implements {Validator}
 */
export class TimeValidator extends Validator {
  /**
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexTime(value)
  }

  /**
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexTime(value) && !isNull(value)
  }

  /**
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {FlexTime} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    console.error('TimeValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {FlexTime} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('TimeValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {FlexTime} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('TimeValidator: no regex for `validateRegex`')
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
