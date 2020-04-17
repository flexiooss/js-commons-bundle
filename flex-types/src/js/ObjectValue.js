import {FlexMap} from './FlexMap'

import {deepFreezeSeal} from './__import__js-generator-helpers'
import {assertType, isObject, isNull, isString, isBoolean, isNumber, isArray} from './__import__assert'
import {FlexArray} from './FlexArray'
import {globalFlexioImport} from './__import__global-import-registry'

/**
 * @typedef {(null | string | number | boolean | ObjectValueValue[]| ObjectValueValueArray | ObjectValue)} ObjectValueValue
 */

/**
 *
 * @param {Array} a
 * @param {Array} [ret=[]]
 * @return {Array}
 */
const arrayToObject = (a, ret = []) => {
  assertType(
    isArray(a) && isArray(ret),
    'arrayToObject: `a` & `ret` should be Array'
  )

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
 *
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
 *
 * @param {*} a
 * @return {boolean}
 */
export const isObjectValueValue = a => isNull(a) || isString(a) || isBoolean(a) || isNumber(a) || a instanceof ObjectValue || a instanceof ObjectValueValueArray

/**
 *
 * @param {?ObjectValue} to
 * @param {?ObjectValue} compare
 * @return {boolean}
 */
const objectValueValueEquals = (to, compare) => {

  assertType((to instanceof ObjectValue || isNull(to)) && (compare instanceof ObjectValue || isNull(compare)), '`to` & `compare` should be an instance of ObjectValue or null')

  if ((isNull(to) && !isNull(compare)) || (!isNull(to) && isNull(compare))) {
    return false
  }

  if (compare == to) {
    return true
  }

  if (compare.size() !== to.size()) {
    return false
  }

  for (const key of compare.propertyNames()) {
    if (!objectValueValuePropertyEquals(to.rawValueOr(key), compare.rawValueOr(key))) {
      return false
    }
  }
  return true
}

/**
 *
 * @param {ObjectValueValue} to
 * @param {ObjectValueValue} compare
 * @return {boolean}
 */
const objectValueValuePropertyEquals = (to, compare) => {
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
 *
 * @param {?Array} to
 * @param {?Array} compare
 * @return {boolean}
 */
const objectValueValueArrayEquals = (to, compare) => {

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
 *
 * @param {*} v
 * @throws {TypeError}
 */
const validateObjectValueValue = v => {
  assertType(
    isObjectValueValue(v),
    'validateObjectValueValue: `v` should be null or string or number or boolean or Array or ObjectValue : %s',
    typeof v
  )

}

const __map = Symbol('__map')

export class ObjectValue {
  /**
   *
   * @param {ObjectValueFlexMap} data
   * @private
   */
  constructor(data) {

    assertType(
      data instanceof ObjectValueFlexMap,
      this.constructor.name + ': `data` should be ObjectValueFlexMap'
    )
    /**
     *
     * @type {ObjectValueFlexMap}
     */
    this[__map] = data
    this.__freeze()
  }

  /**
   *
   * @private
   */
  __freeze() {
    this[__map].forEach((v) => {
      deepFreezeSeal(v)
    })
    deepFreezeSeal(this)
    this[__map].set = function(key) {
      throw new Error('Can\'t add property ' + key + ', map is not extensible')
    }

    this[__map].delete = function(key) {
      throw new Error('Can\'t delete property ' + key + ', map is frozen')
    }

    this[__map].clear = function() {
      throw new Error('Can\'t clear map, map is frozen')
    }
  }

  /**
   *
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return this[__map].has(key)
  }

  /**
   *
   * @param {string} key
   * @return {ObjectValueValue}
   * @throws {IndexError}
   */
  rawValue(key) {
    if (!this.has(key)) {
      throw globalFlexioImport.io.flexio.flex_types.IndexError.BAD_MAP_KEY(key)
    }
    return this[__map].get(key)
  }

  /**
   *
   * @param {string} key
   * @param {ObjectValueValue} [defaultValue=null]
   * @return {ObjectValueValue}
   */
  rawValueOr(key, defaultValue = null) {
    if (!this.has(key)) {
      validateObjectValueValue(defaultValue)
      return defaultValue
    }
    return this[__map].get(key)
  }

  /**
   *
   * @param {string} key
   * @return {?string}
   * @throws {IndexError, TypeError}
   */
  stringValue(key) {
    const val = this.rawValue(key)
    assertType(
      isString(val) || isNull(val),
      this.constructor.name + ': `val` should be string or null'
    )
    return val
  }

  /**
   *
   * @param {string} key
   * @param {?string} [defaultValue=null]
   * @return {?string}
   * @throws {TypeError}
   */
  stringValueOr(key, defaultValue = null) {
    const val = this[__map].get(key)

    if (!this.has(key) || !(isString(val) || isNull(val))) {
      assertType(
        isString(defaultValue) || isNull(defaultValue),
        this.constructor.name + ': `defaultValue` should be string or null'
      )
      return defaultValue
    }

    return val
  }

  /**
   *
   * @param {string} key
   * @return {?number}
   * @throws {IndexError, TypeError}
   */
  numberValue(key) {
    const val = this.rawValue(key)
    assertType(
      isNumber(val) || isNull(val),
      this.constructor.name + ': `val` should be number or null'
    )
    return val
  }

  /**
   *
   * @param {string} key
   * @param {?number} [defaultValue=null]
   * @return {?number}
   * @throws {TypeError}
   */
  numberValueOr(key, defaultValue = null) {
    const val = this[__map].get(key)
    if (!this.has(key) || !(isNumber(val) || isNull(val))) {
      assertType(
        isNumber(defaultValue) || isNull(defaultValue),
        this.constructor.name + ': `defaultValue` should be number or null'
      )
      return defaultValue
    }

    return val
  }

  /**
   *
   * @param {string} key
   * @return {?boolean}
   * @throws {IndexError, TypeError}
   */
  booleanValue(key) {
    const val = this.rawValue(key)
    assertType(
      isBoolean(val) || isNull(val),
      this.constructor.name + ': `val` should be boolean or null'
    )
    return val
  }

  /**
   *
   * @param {string} key
   * @param {?boolean} [defaultValue=null]
   * @return {?boolean}
   * @throws {TypeError}
   */
  booleanValueOr(key, defaultValue = null) {
    const val = this[__map].get(key)
    if (!this.has(key) || !(isBoolean(val) || isNull(val))) {
      assertType(
        isBoolean(defaultValue) || isNull(defaultValue),
        this.constructor.name + ': `defaultValue` should be array or null'
      )
      return defaultValue
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
    const val = this.rawValue(key)
    assertType(
      isArray(val) || isNull(val),
      this.constructor.name + ': `val` should be array or null'
    )
    return val
  }

  /**
   *
   * @param {string} key
   * @param {?(Array|ObjectValueValueArray)} [defaultValue=null]
   * @return {?(Array|ObjectValueValueArray)}
   * @throws {TypeError}
   */
  arrayValueOr(key, defaultValue = null) {
    const val = this[__map].get(key)
    if (!this.has(key) || !(isArray(val) || isNull(val))) {
      assertType(
        isArray(defaultValue) || isNull(defaultValue),
        this.constructor.name + ': `defaultValue` should be array or null'
      )

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
    const val = this[__map].get(key)
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
    return this[__map].size
  }

  /**
   *
   * @return {ObjectValueValueArray}
   */
  properties() {
    return new ObjectValueValueArray(...this[__map].values())
  }

  /**
   * @return {StringArray}
   */
  propertyNames() {
    return new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...this[__map].keys())
  }

  /**
   *
   * @param {ObjectValue} to
   * @return {boolean}
   */
  equals(to) {
    return objectValueValueEquals(this, to)
  }

  /**
   *
   * @return {Object}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   *
   * @return {Object}
   */
  toObject() {
    const ret = {}
    this[__map].forEach((v, k) => {
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
   *
   * @return {{key:string, value:ObjectValueValue}[]}
   */
  toArray() {
    const ret = []
    this[__map].forEach((v, k) => {
      ret.push({
        key: k,
        value: v
      })
    })
    return ret
  }

  /**
   *
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
   * @param {?Array} value
   * @return {ObjectValue}
   */
  withArrayValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.arrayValue(key, value)
    return builder.build()
  }

  /**
   *
   * @param {string} key
   * @param {?ObjectValue} value
   * @return {ObjectValue}
   */
  withObjectValueValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.objectValueValue(key, value)
    return builder.build()
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
  constructor() {
    /**
     *
     * @type {ObjectValueFlexMap}
     * @private
     */
    this[__map] = new ObjectValueFlexMap()
  }

  /**
   *
   * @param {ObjectValueFlexMap} map
   * @return {ObjectValueBuilder}
   */
  data(map) {
    assertType(
      map instanceof ObjectValueFlexMap,
      this.constructor.name + ': `map` should be ObjectValueFlexMap'
    )

    this[__map] = map
    return this
  }

  /**
   *
   * @param {string} key
   * @param {?string} value
   * @return {ObjectValueBuilder}
   */
  stringValue(key, value) {
    assertType(
      isString(key) && (isNull(value) || isString(value)),
      this.constructor.name + ': `key` should be string, `value` should be null or string'
    )
    this[__map].set(key, value)
    return this
  }

  /**
   *
   * @param {string} key
   * @param {?number} value
   * @return {ObjectValueBuilder}
   */
  numberValue(key, value) {
    assertType(
      isString(key) && (isNull(value) || isNumber(value)),
      this.constructor.name + ': `key` should be string, `value` should be null or number'
    )
    this[__map].set(key, value)
    return this
  }

  /**
   *
   * @param {string} key
   * @param {?boolean} value
   * @return {ObjectValueBuilder}
   */
  booleanValue(key, value) {
    assertType(
      isString(key) && (isNull(value) || isBoolean(value)),
      this.constructor.name + ': `key` should be string, `value` should be null or boolean'
    )
    this[__map].set(key, value)
    return this
  }

  /**
   *
   * @param {string} key
   * @param {?(Array|ObjectValueValueArray)} value
   * @return {ObjectValueBuilder}
   */
  arrayValue(key, value) {
    assertType(
      isString(key) && (isNull(value) || isArray(value)),
      this.constructor.name + ': `key` should be string, `value` should be null or Array(strict)'
    )

    if (value instanceof ObjectValueValueArray) {
      this[__map].set(key, value)
    } else {
      this[__map].set(key, new ObjectValueValueArray(...value))
    }
    return this
  }

  /**
   *
   * @param {string} key
   * @param {?ObjectValue} value
   * @return {ObjectValueBuilder}
   */
  objectValueValue(key, value) {
    assertType(
      isString(key) && (isNull(value) || value instanceof ObjectValue),
      this.constructor.name + ': `key` should be string, `value` should be null or ObjectValue'
    )
    this[__map].set(key, value)
    return this
  }

  /**
   *
   * @param {string} key
   * @param {ObjectValueValue} value
   * @return {ObjectValueBuilder}
   */
  value(key, value) {
    assertType(
      isString(key),
      this.constructor.name + ': `key` should be string'
    )
    if (isArray(value)) {
      this.arrayValue(key, value)
    } else {

      this[__map].set(key, value)
    }
    return this
  }

  /**
   * @returns {ObjectValue}
   */
  build() {
    return new ObjectValue(this[__map])
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
    assertType(instance instanceof ObjectValue, 'input should be an instance of ObjectValue')

    let builder = new ObjectValueBuilder()
    for (const item of instance.toArray()) {
      builder.value(item.key, item.value)
    }
    return builder
  }
}

/**
 * @extends {FlexMap<ObjectValueValue>}
 */
class ObjectValueFlexMap extends FlexMap {
  /**
   *
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
   *
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    validateObjectValueValue(v)
  }

  /**
   *
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
