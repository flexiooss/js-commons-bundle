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
  __isGeoloc(value){
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
    throw new Error('CollectionValidator: no range for `validateInRange`')
  }

  /**
   * @param {ObjectValue} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('CollectionValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('CollectionValidator: no regex for `validateRegex`')
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    throw new Error('CollectionValidator: no max size for `validateMaxSize`')
  }
}
