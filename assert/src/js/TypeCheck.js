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
  isDate, isArrowFunction, isEmpty, isAsyncFunction
} from './is'


export class TypeCheck {
  /**
   * @param {any} inst
   * @throws {TypeError}
   * @return {any}
   */
  static assertIsEmpty(inst) {
    assertType(
      isEmpty(inst),
      'input should be Empty given: %s',
      _ => ` ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {any} inst
   * @throws {TypeError}
   * @return {any}
   */
  static assertIsNotEmpty(inst) {
    assertType(
      !isEmpty(inst),
      'input should not be Empty given: %s',
      _ => ` ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {null} inst
   * @throws {TypeError}
   * @return {null}
   */
  static assertIsNull(inst) {
    assertType(
      isNull(inst),
      'input should be Null given: %s',
      _ => ` ${formatType(inst)}`
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
      'input should not be Null given: %s',
      _ => ` ${formatType(inst)}`
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
      _ => `input should be String given: ${formatType(inst)}`
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
      _ => `input should be Boolean given: ${formatType(inst)}`
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
      _ => `input should be Number given: ${formatType(inst)}`
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
      _ => `input should be Integer given: ${formatType(inst)}`
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
      _ => `input should be Object given: ${formatType(inst)}`
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
      _ => `input should be Object given: ${formatType(inst)}`
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
      _ => `input should be Function given: ${formatType(inst)}`
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
  static assertIsAsyncFunction(inst) {
    assertType(
      isAsyncFunction(inst),
      _ => `input should be AsyncFunction given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?Function} inst
   * @throws {TypeError}
   * @return {?Function}
   */
  static assertIsAsyncFunctionOrNull(inst) {
    if (!isNull(inst)) {
      return TypeCheck.assertIsAsyncFunction(inst)
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
      _ => `input should be Arrow Function given: ${formatType(inst)}`
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
      _ => `input should be Node given: ${formatType(inst)}`
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
      _ => `input should be Symbol given: ${formatType(inst)}`
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
      _ => `input should be Array given: ${formatType(inst)}`
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
      _ => `input should be Array(strict) given: ${formatType(inst)}`
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
      _ => `input should be Class given: ${formatType(inst)}`
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
      _ => `input should be RegExp given: ${formatType(inst)}`
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
      _ => `input should be Binary given: ${formatType(inst)}`
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
      _ => `input should be Date given: ${formatType(inst)}`
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
