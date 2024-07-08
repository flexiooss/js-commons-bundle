import {globalFlexioImport} from './__import__global-import-registry.js'
import {FlexMap} from './FlexMap.js'
import {deepFreezeSeal} from './__import__js-generator-helpers.js'
import {
  assertType,
  isObject,
  isNull,
  isString,
  isBoolean,
  isNumber,
  isArray,
  assertInstanceOf, TypeCheck, isArrowFunction, assertInstanceOfOrNull, formatType, isFunction, isStrictObject
} from './__import__assert.js'
import {FlexArray} from './FlexArray.js'
import {ObjectValueTypeError} from "./ObjectValueTypeError.js";

/**
 * @typedef {(null | string | number | boolean | ObjectValueValue[]| ObjectValueValueArray | ObjectValue | FlexDateTime | FlexDate | FlexTime | FlexZonedDateTime)} ObjectValueValue
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
 * @throws {ObjectValueTypeError}
 */
const valueFromItem = (value) => {
  if (isObjectValueValue(value)) return value

  if (isStrictObject(value)) {
    return ObjectValueBuilder.fromObject(value).build()
  } else if (isArray(value)) {
    let ret = new ObjectValueValueArray()
    for (const v of value) {
      ret.push(valueFromItem(v))
    }
    return ret
  }

  throw ObjectValueTypeError.NOT_RECOGNIZED(value)
}

/**
 * @param {*} a
 * @return {boolean}
 */
export const isObjectValueValue = a =>
  isNull(a)
  || isString(a)
  || isBoolean(a)
  || isNumber(a)
  || a instanceof ObjectValue
  || a instanceof ObjectValueValueArray
  || a instanceof globalFlexioImport.io.flexio.flex_types.FlexDateTime
  || a instanceof globalFlexioImport.io.flexio.flex_types.FlexDate
  || a instanceof globalFlexioImport.io.flexio.flex_types.FlexTime
  || a instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime

/**
 * @param {?ObjectValue} to
 * @param {?ObjectValue} compare
 * @param {boolean} [strict=false]
 * @return {boolean}
 */
export const objectValueValueEquals = (to, compare, strict = false) => {

  assertType((to instanceof ObjectValue || isNull(to)) && (compare instanceof ObjectValue || isNull(compare)), '`to` & `compare` should be an instance of ObjectValue or null')

  if ((isNull(to) && !isNull(compare)) || (!isNull(to) && isNull(compare))) {
    return false
  }

  if (compare == to) {
    return true
  }
  if (strict) {
    if (compare.size() !== to.size()) return false
    for (const key of compare.propertyNames()) {
      if (to.has(key) && compare.has(key)) {
        if (!objectValueValuePropertyEquals(to.rawValue(key), compare.rawValue(key), strict)) {
          return false
        }
      } else {
        return false
      }
    }
  } else {
    /**
     * @type {Set<string>}
     */
    const compareKeys = new Set()
    for (const key of compare.propertyNames()) {
      compareKeys.add(key)
      if (!objectValueValuePropertyEquals(to.rawValueOr(key), compare.rawValueOr(key), strict)) {
        return false
      }
    }

    for (const key of to.propertyNames()) {
      if (!compareKeys.has(key)) {
        if (!objectValueValuePropertyEquals(to.rawValueOr(key), compare.rawValueOr(key), strict)) {
          return false
        }
      }
    }
  }

  return true
}


/**
 * @param {ObjectValueValue} to
 * @param {ObjectValueValue} compare
 * @param {boolean} [strict=false]
 * @return {boolean}
 */
export const objectValueValuePropertyEquals = (to, compare, strict = false) => {
  if (compare === to) {
    return true
  }

  /**
   * @type {ObjectValue|FlexDateTime|FlexTime|FlexDate|FlexZonedDateTime|null}
   */
  const type = getInstanceWithEquals(to)

  if (!isNull(type)) {
    return instanceWithEqualsImplEquals(to, compare, type, strict)
  } else if (isArray(to)) {
    return isArray(compare) && objectValueValueArrayEquals(to, compare, strict)
  }

  return false
}


/**
 * @param inst
 * @return {null|ObjectValue|FlexDateTime|*|FlexTime|FlexDate|FlexZonedDateTime}
 */
const getInstanceWithEquals = (inst) => {
  for (const i of instanceWithEqualsList()) {
    if (inst instanceof i) return i
  }
  return null
}

/**
 * @param {ObjectValueValue} to
 * @param {ObjectValueValue} compare
 * @param {boolean} [strict=false]
 * @return {boolean}
 */
const instanceWithEqualsImplEquals = (to, compare, type, strict = false) => {
  if (!(compare instanceof type)) {
    return false
  }
  if (strict && isFunction(to?.strictEquals)) {
    return to.strictEquals(compare)
  }
  return to.equals(compare)
}

/**
 * @param {?Array} to
 * @param {?Array} compare
 * @param {boolean} [strict=false]
 * @return {boolean}
 */
export const objectValueValueArrayEquals = (to, compare, strict = false) => {

  assertType(isArray(to) && isArray(compare), '`to` & `compare` should be an Array')
  if (compare == to) {
    return true
  }
  if (to.length !== compare.length) {
    return false
  }

  for (let i = to.length - 1; i >= 0; --i) {
    if (!objectValueValuePropertyEquals(to[i], compare[i], strict)) {
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
    () => 'should be (null | string | number | boolean | ObjectValueValue[]| ObjectValueValueArray | ObjectValue | FlexDateTime | FlexDate | FlexTime | FlexZonedDateTime) given : ' + formatType(v),
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
   * @param {string} key
   * @param {?FlexDate|FlexTime|FlexDateTime|FlexZonedDateTime} defaultValue
   * @param {Class<FlexDate>|Class<FlexTime>|Class<FlexDateTime>|Class<FlexZonedDateTime>} type
   * @param {string} typeName
   * @return {?FlexDate|FlexTime|FlexDateTime|FlexZonedDateTime}
   * @throws {TypeError}
   */
  #dateAccessorOr(key, defaultValue = null, type, typeName) {
    const val = this.#map.get(key)
    if (!this.has(key) || isNull(val)) {
      return (isNull(defaultValue)) ? defaultValue : assertInstanceOf(defaultValue, type, typeName)
    }
    if (isString(val)) {
      try {
        return new type(val)
      } catch (e) {
        return (isNull(defaultValue)) ? defaultValue : assertInstanceOf(defaultValue, type, typeName)
      }
    }
    return assertInstanceOf(val, type, typeName)
  }

  /**
   * @param {string} key
   * @param {Class<FlexDate>|Class<FlexTime>|Class<FlexDateTime>|Class<FlexZonedDateTime>} type
   * @param {string} typeName
   * @return {string|number|ObjectValueValue[]|ObjectValueValueArray|ObjectValue|FlexDateTime|FlexDate|FlexTime|FlexZonedDateTime|boolean|*}
   */
  #dateAccessor(key, type, typeName) {
    const v = this.rawValue(key)
    if (isString(v)) {
      return new type(v)
    }
    return (isNull(v)) ? v : assertInstanceOf(v, type, typeName)
  }

  /**
   * @param {string} key
   * @return {?FlexDate}
   * @throws {IndexError, TypeError}
   */
  flexDateValue(key) {
    return this.#dateAccessor(key, globalFlexioImport.io.flexio.flex_types.FlexDate, 'io.flexio.flex_types.FlexDate')
  }

  /**
   * @param {string} key
   * @param {?FlexDate} [defaultValue=null]
   * @return {?FlexDate}
   * @throws {TypeError}
   */
  flexDateValueOr(key, defaultValue = null) {
    return this.#dateAccessorOr(key, defaultValue, globalFlexioImport.io.flexio.flex_types.FlexDate, 'io.flexio.flex_types.FlexDate')
  }

  /**
   * @param {string} key
   * @return {?FlexDateTime}
   * @throws {IndexError, TypeError}
   */
  flexDateTimeValue(key) {
    return this.#dateAccessor(key, globalFlexioImport.io.flexio.flex_types.FlexDateTime, 'io.flexio.flex_types.FlexDateTime')
  }

  /**
   * @param {string} key
   * @param {?FlexDateTime} [defaultValue=null]
   * @return {?FlexDateTime}
   * @throws {TypeError}
   */
  flexDateTimeValueOr(key, defaultValue = null) {
    return this.#dateAccessorOr(key, defaultValue, globalFlexioImport.io.flexio.flex_types.FlexDateTime, 'io.flexio.flex_types.FlexDateTime')
  }

  /**
   * @param {string} key
   * @return {?FlexZonedDateTime}
   * @throws {IndexError, TypeError}
   */
  flexZonedDateTimeValue(key) {
    return this.#dateAccessor(key, globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime, 'io.flexio.flex_types.FlexZonedDateTime')
  }

  /**
   * @param {string} key
   * @param {?FlexZonedDateTime} [defaultValue=null]
   * @return {?FlexZonedDateTime}
   * @throws {TypeError}
   */
  flexZonedDateTimeValueOr(key, defaultValue = null) {
    return this.#dateAccessorOr(key, defaultValue, globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime, 'io.flexio.flex_types.FlexZonedDateTime')
  }

  /**
   * @param {string} key
   * @return {?FlexTime}
   * @throws {IndexError, TypeError}
   */
  flexTimeValue(key) {
    return this.#dateAccessor(key, globalFlexioImport.io.flexio.flex_types.FlexTime, 'io.flexio.flex_types.FlexTime')
  }

  /**
   * @param {string} key
   * @param {?FlexTime} [defaultValue=null]
   * @return {?FlexTime}
   * @throws {TypeError}
   */
  flexTimeValueOr(key, defaultValue = null) {
    return this.#dateAccessorOr(key, defaultValue, globalFlexioImport.io.flexio.flex_types.FlexTime, 'io.flexio.flex_types.FlexTime')
  }

  /**
   * @param {string} key
   * @return {?ObjectValueValueArray}
   * @throws {IndexError, TypeError}
   */
  arrayValue(key) {
    return TypeCheck.assertIsArrayOrNull(this.rawValue(key))
  }

  /**
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
   * @param {string} key
   * @return {?ObjectValue}
   * @throws {IndexError, TypeError}
   */
  objectValueValue(key) {
    const val = this.rawValue(key)
    assertType(
      val instanceof ObjectValue || isNull(val),
      ()=> `ObjectValue: \`val\` should be objectValue or null given:${formatType(val)}`
    )
    return val
  }

  /**
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
        ()=> `ObjectValue: \`defaultValue\` should be objectValue or null given:${formatType(val)}`

      )
      return defaultValue
    }

    return val
  }

  /**
   * @return {number}
   */
  size() {
    return this.#map.size
  }

  /**
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
    return objectValueValueEquals(this, to, true)
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
    return this.#toObject()
  }

  /**
   * @return {Object}
   */
  toObjectMini() {
    return this.#toObject(true)
  }

  /**
   * @param {boolean} [mini=false]
   * @return {Object}
   */
  #toObject(mini = false) {
    const ret = {}
    this.#map.forEach((v, k) => {
      let out = v

      if (v instanceof ObjectValue || v instanceof globalFlexioImport.io.flexio.flex_types.FlexArray) {
        out = v.toObject()
      } else if (isArray(v)) {
        out = arrayToObject(v)
      }
      if (!mini || !isNull(out)) {
        ret[k] = out
      }
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
   * @param {string} key
   * @param {?FlexDate} value
   * @return {ObjectValue}
   */
  withFlexDateValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.flexDateValue(key, value)
    return builder.build()
  }

  /**
   * @param {string} key
   * @param {?FlexDateTime} value
   * @return {ObjectValue}
   */
  withFlexDateTimeValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.flexDateTimeValue(key, value)
    return builder.build()
  }

  /**
   * @param {string} key
   * @param {?FlexTime} value
   * @return {ObjectValue}
   */
  withFlexTimeValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.flexTimeValue(key, value)
    return builder.build()
  }

  /**
   * @param {string} key
   * @param {?FlexZonedDateTime} value
   * @return {ObjectValue}
   */
  withFlexZonedDateTimeValue(key, value) {
    const builder = ObjectValueBuilder.from(this)
    builder.flexZonedDateTimeValue(key, value)
    return builder.build()
  }

  /**
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
   * @param {?FlexDate} value
   * @return {ObjectValueBuilder}
   */
  flexDateValue(key, value) {
    TypeCheck.assertIsString(key)
    assertInstanceOfOrNull(value, globalFlexioImport.io.flexio.flex_types.FlexDate, 'io.flexio.flex_types.FlexDate')
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?FlexDateTime} value
   * @return {ObjectValueBuilder}
   */
  flexDateTimeValue(key, value) {
    TypeCheck.assertIsString(key)
    assertInstanceOfOrNull(value, globalFlexioImport.io.flexio.flex_types.FlexDateTime, 'io.flexio.flex_types.FlexDateTime')
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?FlexTime} value
   * @return {ObjectValueBuilder}
   */
  flexTimeValue(key, value) {
    TypeCheck.assertIsString(key)
    assertInstanceOfOrNull(value, globalFlexioImport.io.flexio.flex_types.FlexTime, 'io.flexio.flex_types.FlexTime')
    this.#map.set(key, value)
    return this
  }

  /**
   * @param {string} key
   * @param {?FlexZonedDateTime} value
   * @return {ObjectValueBuilder}
   */
  flexZonedDateTimeValue(key, value) {
    TypeCheck.assertIsString(key)
    assertInstanceOfOrNull(value, globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime, 'io.flexio.flex_types.FlexZonedDateTime')
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
 * @type {function():(ObjectValue|FlexDateTime|FlexTime|FlexDate|FlexZonedDateTime)[]}
 */
const instanceWithEqualsList = () => [
  ObjectValue,
  globalFlexioImport.io.flexio.flex_types.FlexDateTime,
  globalFlexioImport.io.flexio.flex_types.FlexTime,
  globalFlexioImport.io.flexio.flex_types.FlexDate,
  globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime
]

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
