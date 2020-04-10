/**
 * @interface
 */
export class Validator {

  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  validateType(value) {
    throw new Error('Should be override')
  }

  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  validateNotNull(value) {
    throw new Error('Should be override')
  }

  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    throw new Error('Should be override')
  }

  /**
   *
   * @param {*} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('Should be override')
  }

  /**
   *
   * @param {*} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('Should be override')
  }

  /**
   *
   * @param {*} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('Should be override')
  }
}
