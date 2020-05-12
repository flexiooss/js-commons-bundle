import {globalFlexioImport} from './__import__global-import-registry'

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
   *
   * @param {Object} instance
   * @return {boolean}
   */
  static isURLExtended(instance) {
    return instance instanceof globalFlexioImport.io.flexio.extended_flex_types.URLExtended
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
}
