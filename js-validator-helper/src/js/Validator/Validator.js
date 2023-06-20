import {NotOverrideException} from '../../../../assert/index.js'

/**
 * @interface
 */
export class Validator {
  /**
   * @param {*} value
   * @return {boolean}
   */
  validateType(value) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  validateNotNull(value) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }

  /**
   * @param {*} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    throw NotOverrideException.FROM_INTERFACE('Validator')
  }
}
