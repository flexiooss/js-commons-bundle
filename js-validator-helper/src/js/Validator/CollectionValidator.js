import {Validator} from './Validator.js'
import {TypeCheck} from '../__import__flex-types.js'
import {isNull} from '../__import__assert.js'

export const ENTITY_URL = 'collection-entity-url'
export const ELEMENT_URL = 'collection-element-url'

export class CollectionValidator extends Validator {
  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  __isGeoloc(value) {
    return value.has(ENTITY_URL) && value.has(ELEMENT_URL)
  }

  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isObjectValue(value) && this.__isGeoloc(value)
  }

  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isObjectValue(value) && !isNull(value) && this.__isGeoloc(value) &&
      !isNull(value.stringValue(ENTITY_URL)) &&
      !isNull(value.stringValue(ELEMENT_URL))
  }

  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {ObjectValue} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    console.error('CollectionValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {ObjectValue} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('CollectionValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('CollectionValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('CollectionValidator: no max size for `validateMaxSize`')
    return true;
  }
}
