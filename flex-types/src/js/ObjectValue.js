import {FlexMap} from './FlexMap'

import {deepFreezeSeal} from './__import__js-generator-helpers'
import {
  assertType,
  isObject,
  isNull,
  isString,
  isBoolean,
  isNumber,
  isArray,
  assertInstanceOf, TypeCheck, isArrowFunction
} from './__import__assert'
import {FlexArray} from './FlexArray'
import {globalFlexioImport} from './__import__global-import-registry'

/**
 * @typedef {(null | string | number | boolean | ObjectValueValue[]| ObjectValueValueArray | ObjectValue)} ObjectValueValue
 */

/**
 * @param {Array} a
 * @param {Array} [ret=[]]
 * @return {Array}
 */
const arrayToObject = (a, ret = []) => {
  TypeCheck.assertIsArray(a)
  TypeCheck.assertIsArray(ret)

  for (const val of a) {
    if (val instanceof ObjectValue || val instanceof globalFlexioImport.io.flexio.flex_types.FlexArray) {
      ret.push(val.toObject())
    } else if (isArray(val)) {
      ret.push(arrayToObject(val, ret))
    } else {
      ret.push(val)
    }
  }
  return ret
}
/**
 * @param {*} value
 * @return {ObjectValueValue}
 */
const valueFromItem = (value) => {
  if (isObject(value)) {
    if (value instanceof ObjectValue) {
      return value
    }
    return ObjectValueBuilder.fromObject(value).build()
  } else if (isArray(value)) {
    if (value instanceof ObjectValueValueArray) {
      return value
    }
    let ret = new ObjectValueValueArray()

    for (const v of value) {
      ret.push(valueFromItem(v))
    }
    return ret
  }

  return value
}

/**
 * @param {*} a
 * @return {boolean}
 */
export const isObjectValueValue = a => isNull(a) || isString(a) || isBoolean(a) || isNumber(a) || a instanceof ObjectValue || a instanceof ObjectValueValueArray

/**
 * @param {?ObjectValue} to
 * @param {?ObjectValue} compare
 * @return {boolean}
 */
export const objectValueValueEquals = (to, compare) => {

  assertType((to instanceof ObjectValue || isNull(to)) && (compare instanceof ObjectValue || isNull(compare)), '`to` & `compare` should be an instance of ObjectValue or null')

  if ((isNull(to) && !isNull(compare)) || (!isNull(to) && isNull(compare))) {
    return false
  }

  if (compare == to) {
    return true
  }

  for (const key of compare.propertyNames()) {
    if (!objectValueValuePropertyEquals(to.rawValueOr(key), compare.rawValueOr(key))) {
      return false
    }
  }

  return true
}

/**
 * @param {ObjectValueValue} to
 * @param {ObjectValueValue} compare
 * @return {boolean}
 */
export const objectValueValuePropertyEquals = (to, compare) => {
  if (compare === to) {
    return true
  }

  if (to instanceof ObjectValue) {
    if (!(compare instanceof ObjectValue)) {
      return false
    }

    return to.equals(compare)

  } else if (isArray(to)) {
    return isArray(compare) && objectValueValueArrayEquals(to, compare)
  }

  return false
}

/**
 * @param {?Array} to
 * @param {?Array} compare
 * @return {boolean}
 */
export const objectValueValueArrayEquals = (to, compare) => {

  assertType(isArray(to) && isArray(compare), '`to` & `compare` should be an Array')
  if (compare == to) {
    return true
  }
  if (to.length !== compare.length) {
    return false
  }

  for (let i = to.length - 1; i >= 0; --i) {
    if (!objectValueValuePropertyEquals(to[i], compare[i])) {
      return false
    }
  }

  return true
}

/**
 * @param {ObjectValueValue} v
 * @throws {TypeError}
 * @return {ObjectValueValue}
 */
const validateObjectValueValue = v => {
  assertType(
    isObjectValueValue(v),
    'validateObjectValueValue: `v` should be null or string or number or boolean or Array or ObjectValue : %s',
    typeof v
  )
  return v
}

export class ObjectValue {
  /**
   * @type {ObjectValueFlexMap}
   */
  #map

  /**
   * @param {ObjectValueFlexMap} data
   * @private
   */
  constructor(data) {
    /**
     * @type {ObjectValueFlexMap}
     */
    this.#map = assertInstanceOf(data, ObjectValueFlexMap)
    this.#freeze()
  }

  #freeze() {
    this.#map.forEach((v) => {
      deepFreezeSeal(v)
    })
    deepFreezeSeal(this)
    this.#map.set = function (key) {
      throw new Error('Can\'t add property ' + key + ', map is not extensible')
    }

    this.#map.delete = function (key) {
      throw new Error('Can\'t delete property ' + key + ', map is frozen')
    }

    this.#map.clear = function () {
      throw new Error('Can\'t clear map, map is frozen')
    }
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return this.#map.has(key)
  }

  /**
   * @param {string} key
   * @return {ObjectValueValue}
   * @throws {IndexError}
   */
  rawValue(key) {
    if (!this.has(key)) {
      throw globalFlexioImport.io.flexio.flex_types.IndexError.BAD_MAP_KEY(key)
    }
    return this.#map.get(key)
  }

  /**
   * @param {string} key
   * @param {ObjectValueValue} [defaultValue=null]
   * @return {ObjectValueValue}
   */
  rawValueOr(key, defaultValue = null) {
    if (!this.has(key)) {
      return validateObjectValueValue(defaultValue)
    }
    return this.#map.get(key)
  }

  /**
   *
   * @param {string} key
   * @return {?string}
   * @throws {IndexError, TypeError}
   */
  stringValue(key) {
    return TypeCheck.assertIsStringOrNull(this.rawValue(key))
  }

  /**
   * @param {string} key
   * @param {?string} [defaultValue=null]
   * @return {?string}
   * @throws {TypeError}
   */
  stringValueOr(key, defaultValue = null) {
    const val = this.#map.get(key)
    if (!this.has(key) || !(isString(val) || isNull(val))) {
      return TypeCheck.assertIsStringOrNull(defaultValue)
    }
    return val
  }

  /**
   * @param {string} key
   * @return {?number}
   * @throws {IndexError, TypeError}
   */
  numberValue(key) {
    return TypeCheck.assertIsNumberOrNull(this.rawValue(key))
  }

  /**
   * @param {string} key
   * @param {?number} [defaultValue=null]
   * @return {?number}
   * @throws {TypeError}
   */
  numberValueOr(key, defaultValue = null) {
    const val = this.#map.get(key)
    if (!this.has(key) || !(isNumber(val) || isNull(val))) {
      return TypeCheck.assertIsNumberOrNull(defaultValue)
    }
    return val
  }

  /**
   * @param {string} key
   * @return {?boolean}
   * @throws {IndexError, TypeError}
   */
  booleanValue(key) {
    return TypeCheck.assertIsBooleanOrNull(this.rawValue(key))
  }

  /**
   *
   * @param {string} key
   * @param {?boolean} [defaultValue=null]
   * @return {?boolean}
   * @throws {TypeError}
   */
  booleanValueOr(key, defaultValue = null) {
    const val = this.#map.get(key)
    if (!this.has(key) || !(isBoolean(val) || isNull(val))) {
      return TypeCheck.assertIsBooleanOrNull(defaultValue)
    }
    return val
  }

  /**
   *
   * @param {string} key
   * @return {?ObjectValueValueArray}
   * @throws {IndexError, TypeError}
   */
  arrayValue(key) {
    return TypeCheck.assertIsArrayOrNull(this.rawValue(key))
  }

  /**
   *
   * @param {string} key
   * @param {?(Array|ObjectValueValueArray)} [defaultValue=null]
   * @return {?(Array|ObjectValueValueArray)}
   * @throws {TypeError}
   */
  arrayValueOr(key, defaultValue = null) {
    const val = this.#map.get(key)
    if (!this.has(key) || !(isArray(val) || isNull(val))) {
      if (isNull(defaultValue)) {
        return null
      }

      TypeCheck.assertIsArray(defaultValue)

      if (!(defaultValue instanceof ObjectValueValueArray)) {
        return new ObjectValueValueArray(...defaultValue)
      }

      return defaultValue
    }

    return val
  }

  /**
   *
   * @param {string} key
   * @return {?ObjectValue}
   * @throws {IndexError, TypeError}
   */
  objectValueValue(key) {
    const val = this.rawValue(key)
    assertType(
      val instanceof ObjectValue || isNull(val),
      this.constructor.name + ': `val` should be objectValue or null'
    )
    return val
  }

  /**
   *
   * @param {string} key
   * @param {?ObjectValue} [defaultValue=null]
   * @return {?ObjectValue}
   * @throws {TypeError}
   */
  objectValueValueOr(key, defaultValue = null) {
    const val = this.#map.get(key)
    if (!this.has(key) || !(val instanceof ObjectValue || isNull(val))) {
      assertType(
        defaultValue instanceof ObjectValue || isNull(defaultValue),
        this.constructor.name + ': `defaultValue` should be objectValue or null'
      )
      return defaultValue
    }

    return val
  }

  /**
   *
   * @return {number}
   */
  size() {
    return this.#map.size
  }

  /**
   *
   * @return {ObjectValueValueArray}
   */
  properties() {
    return new ObjectValueValueArray(...this.#map.values())
  }

  /**
   * @return {StringArray}
   */
  propertyNames() {
    return new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...this.#map.keys())
  }

  /**
   * @param {ObjectValue} to
   * @return {boolean}
   */
  equals(to) {
    return objectValueValueEquals(this, to)
  }

  /**
   * @param {ObjectValue} to
   * @return {boolean}
   */
  strictEquals(to) {
    if (!isNull(to)) return this.size() === to.size()
    return objectValueValueEquals(this, to)
  }

  /**
   * @return {Object}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   * @return {Object}
   */
  toObject() {
    const ret = {}
    this.#map.forEach((v, k) => {
      let out = v

      if (v instanceof ObjectValue || v instanceof globalFlexioImport.io.flexio.flex_types.FlexArray) {
        out = v.toObject()
      } else if (isArray(v)) {
        out = arrayToObject(v)
      }

      ret[k] = out
    })
    return ret
  }

  /**
   * @return {{key:string, value:ObjectValueValue}[]}
   */
  toArray() {
    const ret = []
    this.#map.forEach((v, k) => {
      ret.push({
        key: k,
        value: v
      })
    })
    return ret
  }

  /**
   * @param {string} key
   * @param {?string} value
   * @return {ObjectValue}
   */
  withStringValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.stringValue(key, value)
    return builder.build()
  }

  /**
   *
   * @param {string} key
   * @param {?number} value
   * @return {ObjectValue}
   */
  withNumberValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.numberValue(key, value)
    return builder.build()
  }

  /**
   *
   * @param {string} key
   * @param {?boolean} value
   * @return {ObjectValue}
   */
  withBooleanValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.booleanValue(key, value)
    return builder.build()
  }

  /**
   *
   * @param {string} key
   * @param {?Array | function(list:ObjectValueValueArray):ObjectValueValueArray} value
   * @return {ObjectValue}
   */
  withArrayValue(key, value) {
    if (isArrowFunction(value)) {
      value = value.call(null, this.arrayValueOr(key, new ObjectValueValueArray()))
    }
    const builder = ObjectValueBuilder.from(this)
    builder.arrayValue(key, value)
    return builder.build()
  }

  /**
   * @param {string} key
   * @param {?ObjectValue | function(objectValue:ObjectValue):ObjectValue} value
   * @return {ObjectValue}
   */
  withObjectValueValue(key, value) {
    if (isArrowFunction(value)) {
      value = value.call(null, this.objectValueValueOr(key, new ObjectValueBuilder().build()))
    }
    const builder = ObjectValueBuilder.from(this)
    builder.objectValueValue(key, value)
    return builder.build()
  }

  /**
   * @param {string} key
   * @param {function(builder:ObjectValueBuilder):ObjectValue} clb
   * @return {ObjectValue}
   */
  withChangedObjectValueValue(key, clb) {
    const value = TypeCheck.assertIsArrowFunction(clb).call(null, ObjectValueBuilder.from(this.objectValueValueOr(key, new ObjectValueBuilder().build())))
    return this.withObjectValueValue(key, value)
  }

  /**
   *
   * @param {string} key
   * @param {ObjectValueValue} value
   * @return {ObjectValue}
   */
  withValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.value(key, value)
    return builder.build()
  }

  /**
   * @param {ObjectValue} instance
   * @returns {ObjectValue}
   */
  mergeWith(instance) {
    const builder = ObjectValueBuilder.from(this)
    builder.merge(instance)
    return builder.build()
  }

  /**
   * @return {ObjectValueBuilder}
   */
  toBuilder() {
    return ObjectValueBuilder.from(this)
  }

  /**
   * @param {string} key
   * @return {ObjectValue}
   */
  without(key) {
    const builder = ObjectValueBuilder.from(this)
    return builder.without(key).build()
  }

  /**
   * @returns {ObjectValueBuilder}
   */
  static builder() {
    return new ObjectValueBuilder()
  }

  /**
   * @param {ObjectValue} instance
   * @returns {ObjectValueBuilder}
   */
  static from(instance) {
    return ObjectValueBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {ObjectValueBuilder}
   */
  static fromObject(jsonObject) {
    return ObjectValueBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {ObjectValueBuilder}
   */
  static fromJson(json) {
    return ObjectValueBuilder.fromJson(json)
  }
}

export class ObjectValueBuilder {
  /**
   * @type {ObjectValueFlexMap}
   */
  #map = new ObjectValueFlexMap()

  /**
   * @param {string} message
   * @return {string}
   */
  #message(message) {
    return `ObjectValueBuilder|${this.constructor.name}:${message}`
  }

  /**
   * @param {ObjectValueFlexMap} map
   * @return {ObjectValueBuilder}
   */
  data(map) {
    assertType(
      map instanceof ObjectValueFlexMap,
      this.constructor.name + ': `map` should be ObjectValueFlexMap'
    )

    this.#map = map
    return this
  }

  /**
   * @param {string} key
   * @param {?string} value
   * @return {ObjectValueBuilder}
   */
  stringValue(key, value) {
    TypeCheck.assertIsString(key)
    TypeCheck.assertIsStringOrNull(value)
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?number} value
   * @return {ObjectValueBuilder}
   */
  numberValue(key, value) {
    TypeCheck.assertIsString(key)
    TypeCheck.assertIsNumberOrNull(value)
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?boolean} value
   * @return {ObjectValueBuilder}
   */
  booleanValue(key, value) {
    TypeCheck.assertIsString(key)
    TypeCheck.assertIsBooleanOrNull(value)
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?(Array|ObjectValueValueArray)|function(list:ObjectValueValueArray):ObjectValueValueArray} value
   * @return {ObjectValueBuilder}
   */
  arrayValue(key, value) {
    if (isArrowFunction(value)) {
      value = value.call(null, new ObjectValueValueArray())
    }
    TypeCheck.assertIsString(key)
    TypeCheck.assertIsArrayOrNull(value)
    if (value instanceof ObjectValueValueArray) {
      this.#map.set(key, value)
    } else {
      this.#map.set(key, isNull(value) ? null : new ObjectValueValueArray(...value))
    }
    return this
  }

  /**
   * @param {string} key
   * @param {?ObjectValue | function(builder:ObjectValueBuilder):ObjectValue} value
   * @return {ObjectValueBuilder}
   */
  objectValueValue(key, value) {
    if (isArrowFunction(value)) {
      value = value.call(null, new ObjectValueBuilder())
    }
    TypeCheck.assertIsString(key)
    assertType(isNull(value) || value instanceof ObjectValue, this.#message('should be null or ObjectValue'))
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {ObjectValueValue} value
   * @return {ObjectValueBuilder}
   */
  value(key, value) {
    TypeCheck.assertIsString(key)
    if (isArray(value)) {
      this.arrayValue(key, value)
    } else {
      this.#map.set(key, value)
    }
    return this
  }

  /**
   * @returns {ObjectValue}
   */
  build() {
    return new ObjectValue(this.#map)
  }

  /**
   * @param {Object} jsonObject
   * @returns {ObjectValueBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new ObjectValueBuilder()
    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        builder.value(key, valueFromItem(jsonObject[key]))
      }
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {ObjectValueBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {ObjectValue} instance
   * @returns {ObjectValueBuilder}
   */
  static from(instance) {
    assertInstanceOf(instance, ObjectValue, 'ObjectValue')
    let builder = new ObjectValueBuilder()
    for (const item of instance.toArray()) {
      builder.value(item.key, item.value)
    }
    return builder
  }

  /**
   * @param {ObjectValue} instance
   * @returns {ObjectValueBuilder}
   */
  merge(instance) {
    assertInstanceOf(instance, ObjectValue, 'ObjectValue')
    for (const item of instance.toArray()) {
      this.value(item.key, item.value)
    }
    return this
  }

  /**
   * @param {string} key
   * @return {ObjectValueBuilder}
   */
  without(key) {
    this.#map.delete(key)
    return this
  }
}

/**
 * @extends {FlexMap<ObjectValueValue>}
 */
class ObjectValueFlexMap extends FlexMap {
  /**
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    validateObjectValueValue(v)
  }
}

/**
 * @extends {FlexArray<ObjectValueValue>}
 */
export class ObjectValueValueArray extends FlexArray {

  constructor(...args) {
    super()
    for (const v of args) {

      if (isArray(v) && !(v instanceof ObjectValueValueArray)) {

        this.push(new ObjectValueValueArray(...v))
      } else {
        this.push(v)
      }
    }

  }

  /**
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    validateObjectValueValue(v)
  }

  /**
   * @return {Array<ObjectValueValue>}
   */
  toObject() {
    return this.mapToArray((v, k) => {
      if (v instanceof ObjectValue || v instanceof globalFlexioImport.io.flexio.flex_types.FlexArray) {
        return v.toObject()
      }
      return v
    })
  }
}
