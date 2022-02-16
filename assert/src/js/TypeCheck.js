import {assertType, formatType} from './assert'
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
  isDate, isArrowFn, isArrowFunction
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
      'input should be Null given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {any} inst
   * @throws {TypeError}
   * @return {any}
   */
  static assertIsNotNull(inst) {
    assertType(
      !isNull(inst),
      'input should be Null given: %s',
      formatType(inst)
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
      'input should be String given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?string} inst
   * @throws {TypeError}
   * @return {?string}
   */
  static assertIsStringOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsString(inst)
    }
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
      'input should be Boolean given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?boolean} inst
   * @throws {TypeError}
   * @return {?boolean}
   */
  static assertIsBooleanOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsBoolean(inst)
    }
    return inst
  }

  /**
   * @param {Number} inst
   * @throws {TypeError}
   * @return {Number}
   */
  static assertIsNumber(inst) {
    assertType(
      isNumber(inst),
      'input should be Number given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Number} inst
   * @throws {TypeError}
   * @return {Number}
   */
  static assertIsNumberOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsNumber(inst)
    }
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
      'input should be Integer given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Number} inst
   * @throws {TypeError}
   * @return {?Number}
   */
  static assertIsIntegerOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsInteger(inst)
    }
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
      'input should be Object given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Object} inst
   * @throws {TypeError}
   * @return {?Object}
   */
  static assertIsObjectOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsObject(inst)
    }
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
      'input should be Object given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Object} inst
   * @throws {TypeError}
   * @return {?Object}
   */
  static assertIsStrictObjectOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsStrictObject(inst)
    }
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
      'input should be Function given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Function} inst
   * @throws {TypeError}
   * @return {?Function}
   */
  static assertIsFunctionOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsFunction(inst)
    }
    return inst
  }

  /**
   * @param {Function} inst
   * @throws {TypeError}
   * @return {Function}
   */
  static assertIsArrowFunction(inst) {
    assertType(
      isArrowFunction(inst),
      'input should be Arrow Function given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Function} inst
   * @throws {TypeError}
   * @return {?Function}
   */
  static assertIsArrowFunctionOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsArrowFunction(inst)
    }
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
      'input should be Node given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Node} inst
   * @throws {TypeError}
   * @return {?Node}
   */
  static assertIsNodeOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsNode(inst)
    }
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
      'input should be Symbol given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Symbol} inst
   * @throws {TypeError}
   * @return {?Symbol}
   */
  static assertIsSymbolOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsSymbol(inst)
    }
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
      'input should be Array given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Array} inst
   * @throws {TypeError}
   * @return {?Array}
   */
  static assertIsArrayOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsArray(inst)
    }
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
      'input should be Array(strict) given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Array} inst
   * @throws {TypeError}
   * @return {?Array}
   */
  static assertIsStrictArrayOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsStrictArray(inst)
    }
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
      'input should be Class given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Class} inst
   * @throws {TypeError}
   * @return {?Class}
   */
  static assertIsClassOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsClass(inst)
    }
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
      'input should be RegExp given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?RegExp} inst
   * @throws {TypeError}
   * @return {?RegExp}
   */
  static assertIsRegExpOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsRegExp(inst)
    }
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
      'input should be Binary given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Blob} inst
   * @throws {TypeError}
   * @return {?Blob}
   */
  static assertIsBinaryOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsBinary(inst)
    }
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
      'input should be Date given: %s',
      formatType(inst)
    )
    return inst
  }

  /**
   * @param {?Date} inst
   * @throws {TypeError}
   * @return {?Date}
   */
  static assertIsDateOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsDate(inst)
    }
    return inst
  }
}
