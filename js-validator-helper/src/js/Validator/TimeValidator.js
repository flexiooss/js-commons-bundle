import {Validator} from './Validator'
import {isNull} from '../__import__assert'
import {TypeCheck} from '../__import__flex-types'

/**
 * @implements {Validator}
 */
export class TimeValidator extends Validator {
  /**
   *
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexTime(value)
  }

  /**
   *
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexTime(value) && !isNull(value)
  }

  /**
   *
   * @param {FlexTime} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   *
   * @param {FlexTime} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('DateValidator: no range for `validateInRange`')
  }

  /**
   *
   * @param {FlexTime} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('DateValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   *
   * @param {FlexTime} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('DateValidator: no regex for `validateRegex`')
  }
}
