import {globalFlexioImport} from './__import__global-import-registry'
import {assertType} from './__import__assert'


export class TypeCheck {
//  /**
//   *
//   * @param {Object} instance
//   * @return {boolean}
//   */
//  static isStringArray(instance) {
//    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.StringArray
//  }
//
//  /**
//   *
//   * @param {Object} instance
//   * @return {boolean}
//   */
//  static isNumberArray(instance) {
//    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.NumberArray
//  }

  /**
   * @param {Object} instance
   * @return {boolean}
   */
  static isURLExtended(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.URLExtended
  }

  /**
   * @param {URLExtended} instance
   * @throws {TypeError}
   * @return {URLExtended}
   */
  static assertIsURLExtended(instance) {
    assertType(TypeCheck.isURLExtended(instance), 'instance should be a URLExtended')
    return instance
  }

  /**
   * @param {Object} instance
   * @return {boolean}
   */
  static isURLSearchParamsExtended(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtended
  }

  /**
   * @param {URLSearchParamsExtended} instance
   * @throws {TypeError}
   * @return {URLSearchParamsExtended}
   */
  static assertIsURLSearchParamsExtended(instance) {
    assertType(TypeCheck.isURLSearchParamsExtended(instance), 'instance should be a URLSearchParamsExtended')
    return instance
  }

  /**
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isFlexUrl(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.FlexUrl
  }

  /**
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isDateExtended(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.DateExtended
  }

  /**
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isSymbolStringArray(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.SymbolStringArray
  }

  /**
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isStringMap(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.StringMap
  }

  /**
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isStringArrayMap(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.StringArrayMap
  }

  /**
   * @param {StringArrayMap} instance
   * @throws {TypeError}
   * @return {StringArrayMap}
   */
  static assertIsStringArrayMap(instance) {
    assertType(TypeCheck.isStringArrayMap(instance), 'instance should be a StringArrayMap')
    return instance
  }

}
