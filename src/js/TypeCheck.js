import {assertType} from './assert'
import {isBoolean, isInteger, isNull, isNumber, isRegex, isStrictObject, isString, isClass, isStrictArray,isSymbol,isArray,isNode,isFunction, isObject} from './is'

export class TypeCheck {
  /**
   *
   * @param {null} inst
   * @throws {TypeError}
   */
  static assertIsNull(inst){
    assertType(
      isNull(inst),
      'input should be Null'
    )
  }

   /**
   *
   * @param {string} inst
   * @throws {TypeError}
   */
  static assertIsString(inst){
    assertType(
      isString(inst),
      'input should be String'
    )
  }

  /**
   *
   * @param {boolean} inst
   * @throws {TypeError}
   */
  static assertIsBoolean(inst){
    assertType(
      isBoolean(inst),
      'input should be Boolean'
    )
  }

  /**
   *
   * @param {Number} inst
   * @throws {TypeError}
   */
  static assertIsNumber(inst){
    assertType(
      isNumber(inst),
      'input should be Number'
    )
  }

  /**
   *
   * @param {Number} inst
   * @throws {TypeError}
   */
  static assertIsInteger(inst){
    assertType(
      isInteger(inst),
      'input should be Integer'
    )
  }

  /**
   *
   * @param {Object} inst
   * @throws {TypeError}
   */
  static assertIsObject(inst){
    assertType(
      isObject(inst),
      'input should be Object'
    )
  }

  /**
   *
   * @param {Object} inst
   * @throws {TypeError}
   */
  static assertIsStrictObject(inst){
    assertType(
      isStrictObject(inst),
      'input should be Object'
    )
  }

  /**
   *
   * @param {Function} inst
   * @throws {TypeError}
   */
  static assertIsFunction(inst){
    assertType(
      isFunction(inst),
      'input should be Function'
    )
  }

  /**
   *
   * @param {Node} inst
   * @throws {TypeError}
   */
  static assertIsNode(inst){
    assertType(
      isNode(inst),
      'input should be Node'
    )
  }

  /**
   *
   * @param {Symbol} inst
   * @throws {TypeError}
   */
  static assertIsSymbol(inst){
    assertType(
      isSymbol(inst),
      'input should be Symbol'
    )
  }

  /**
   *
   * @param {Array} inst
   * @throws {TypeError}
   */
  static assertIsArray(inst){
    assertType(
      isArray(inst),
      'input should be Array'
    )
  }

  /**
   *
   * @param {Array} inst
   * @throws {TypeError}
   */
  static assertIsStrictArray(inst){
    assertType(
      isStrictArray(inst),
      'input should be Array(strict)'
    )
  }

  /**
   *
   * @param {Class} inst
   * @throws {TypeError}
   */
  static assertIsClass(inst){
    assertType(
      isClass(inst),
      'input should be Class'
    )
  }

  /**
   *
   * @param {RegExp} inst
   * @throws {TypeError}
   */
  static assertIsRegExp(inst){
    assertType(
      isRegex(inst),
      'input should be RegExp'
    )
  }
}
