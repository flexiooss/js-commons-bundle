import {Validator} from './Validator'
import {isNull} from '../__import__assert'
import {TypeCheck} from '../__import__flex-types'

/**
 * @implements {Validator}
 */
export class DateTimeValidator extends Validator {
  /**
   *
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexDateTime(value)
  }

  /**
   *
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexDateTime(value) && !isNull(value)
  }

  /**
   *
   * @param {FlexDateTime} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   *
   * @param {FlexDateTime} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('DateValidator: no range for `validateInRange`')
  }

  /**
   *
   * @param {FlexDateTime} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('DateValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   *
   * @param {FlexDateTime} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('DateValidator: no regex for `validateRegex`')
  }
}
