import {Validator} from './Validator.js'
import {TypeCheck} from '../__import__flex-types.js'
import {isNull} from '../__import__assert.js'

export const LATITUDE_PROPERTY = 'latitude'
export const LONGITUDE_PROPERTY = 'longitude'

export class GeolocValidator extends Validator {
  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  __isGeoloc(value){
    return value.has(LATITUDE_PROPERTY) && value.has(LONGITUDE_PROPERTY)
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
      !isNull(value.numberValue(LATITUDE_PROPERTY)) &&
      !isNull(value.numberValue(LONGITUDE_PROPERTY))
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
    console.error('GeolocValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {ObjectValue} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('GeolocValidator: no enumeratedValues for `validateInEnumerated`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('GeolocValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('GeolocValidator: no max size for `validateMaxSize`')
    return true;
  }
}
