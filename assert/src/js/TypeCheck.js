import {assertType} from './assert'
import {
  isBoolean,
  isInteger,
  isNull,
  isNumber,
  isRegex,
  isStrictObject,
  isString,
  isClass,
  isStrictArray,
  isSymbol,
  isArray,
  isNode,
  isFunction,
  isObject,
  isBinary,
  isDate
} from './is'


export class TypeCheck {
  /**
   * @param {null} inst
   * @throws {TypeError}
   * @return {null}
   */
  static assertIsNull(inst) {
    assertType(
      isNull(inst),
      'input should be Null'
    )
    return inst
  }

  /**
   * @param {string} inst
   * @throws {TypeError}
   * @return {string}
   */
  static assertIsString(inst) {
    assertType(
      isString(inst),
      'input should be String'
    )
    return inst
  }

  /**
   * @param {boolean} inst
   * @throws {TypeError}
   * @return {boolean}
   */
  static assertIsBoolean(inst) {
    assertType(
      isBoolean(inst),
      'input should be Boolean'
    )
    return inst
  }

  /**
   *
   * @param {Number} inst
   * @throws {TypeError}
   *
   */
  static assertIsNumber(inst) {
    assertType(
      isNumber(inst),
      'input should be Number'
    )
    return inst
  }

  /**
   * @param {Number} inst
   * @throws {TypeError}
   * @return {Number}
   */
  static assertIsInteger(inst) {
    assertType(
      isInteger(inst),
      'input should be Integer'
    )
    return inst
  }

  /**
   * @param {Object} inst
   * @throws {TypeError}
   * @return {Object}
   */
  static assertIsObject(inst) {
    assertType(
      isObject(inst),
      'input should be Object'
    )
    return inst
  }

  /**
   * @param {Object} inst
   * @throws {TypeError}
   * @return {Object}
   */
  static assertIsStrictObject(inst) {
    assertType(
      isStrictObject(inst),
      'input should be Object'
    )
    return inst
  }

  /**
   * @param {Function} inst
   * @throws {TypeError}
   * @return {Function}
   */
  static assertIsFunction(inst) {
    assertType(
      isFunction(inst),
      'input should be Function'
    )
    return inst
  }

  /**
   * @param {Node} inst
   * @throws {TypeError}
   * @return {Node}
   */
  static assertIsNode(inst) {
    assertType(
      isNode(inst),
      'input should be Node'
    )
    return inst
  }

  /**
   * @param {Symbol} inst
   * @throws {TypeError}
   * @return {Symbol}
   */
  static assertIsSymbol(inst) {
    assertType(
      isSymbol(inst),
      'input should be Symbol'
    )
    return inst
  }

  /**
   * @param {Array} inst
   * @throws {TypeError}
   * @return {Array}
   */
  static assertIsArray(inst) {
    assertType(
      isArray(inst),
      'input should be Array'
    )
    return inst
  }

  /**
   * @param {Array} inst
   * @throws {TypeError}
   * @return {Array}
   */
  static assertIsStrictArray(inst) {
    assertType(
      isStrictArray(inst),
      'input should be Array(strict)'
    )
    return inst
  }

  /**
   * @param {Class} inst
   * @throws {TypeError}
   * @return {Class}
   */
  static assertIsClass(inst) {
    assertType(
      isClass(inst),
      'input should be Class'
    )
    return inst
  }

  /**
   * @param {RegExp} inst
   * @throws {TypeError}
   * @return {RegExp}
   */
  static assertIsRegExp(inst) {
    assertType(
      isRegex(inst),
      'input should be RegExp'
    )
    return inst
  }

  /**
   * @param {Blob} inst
   * @throws {TypeError}
   * @return {Blob}
   */
  static assertIsBinary(inst) {
    assertType(
      isBinary(inst),
      'input should be Binary'
    )
    return inst
  }

  /**
   * @param {Date} inst
   * @throws {TypeError}
   * @return {Date}
   */
  static assertIsDate(inst) {
    assertType(
      isDate(inst),
      'input should be Date'
    )
    return inst
  }
}
