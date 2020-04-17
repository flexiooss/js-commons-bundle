import {Validator} from './Validator'
import {isNull, isString, isRegex} from '../__import__assert'

const PHONE_NUMBER_REGEX = /^\+\d{1,3}\d{1,14}$/
/**
 * @implements {Validator}
 */
export class PhoneNumberValidator extends Validator {
  /**
   *
   * @param {string} value
   * @return {boolean}
   */
  validateType(value) {
    if(isNull(value)){
      return true
    }
    return isString(value) && PHONE_NUMBER_REGEX.test(value)
  }

  /**
   *
   * @param {string} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   *
   * @param {string} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value) && value !== ''
  }

  /**
   *
   * @param {string} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    if(isNull(value)){
      return true
    }
    return this.validateType(rangeStart) && this.validateType(rangeEnd) && this.validateType(value) && value >= rangeStart && value <= rangeEnd
  }

  /**
   *
   * @param {string} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('PhoneNumberValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   *
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    if(isNull(value)){
      return true
    }
    return isRegex(regex) && this.validateType(value) && regex.test(value)
  }
}
