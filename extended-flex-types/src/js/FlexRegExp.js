import {globalFlexioImport} from './__import__global-import-registry'
import {assertType, isObject, isRegex, isNull, isString} from './__import__assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'


class FlexRegExp {
  /**
   * @param {RegExp} value
   * @param {?StringArray} namedGroups
   * @private
   */
  constructor(value, namedGroups) {
    /**
     * @private
     */
    this._value = value
    /**
     *
     * @type {?StringArray}
     * @private
     */
    this._namedGroups = namedGroups

    deepFreezeSeal(this)
  }

  /**
   * @returns {RegExp}
   */
  value() {
    return this._value
  }

  /**
   *
   * @return {?StringArray}
   */
  namedGroups() {
    return this._namedGroups
  }

  /**
   * @param {RegExp} value
   * @returns {FlexRegExp}
   */
  withValue(value) {
    let builder = FlexRegExpBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  /**
   * @param {?StringArray} value
   * @returns {FlexRegExp}
   */
  withNamedGroups(value) {
    let builder = FlexRegExpBuilder.from(this)
    builder.namedGroups(value)
    return builder.build()
  }

  /**
   * @returns {FlexRegExpBuilder}
   */
  static builder() {
    return new FlexRegExpBuilder()
  }

  /**
   * @param {FlexRegExp} instance
   * @returns {FlexRegExpBuilder}
   */
  static from(instance) {
    return FlexRegExpBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexRegExpBuilder}
   */
  static fromObject(jsonObject) {
    return FlexRegExpBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {FlexRegExpBuilder}
   */
  static fromJson(json) {
    return FlexRegExpBuilder.fromJson(json)
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._value)) {
      jsonObject['value'] = this._value.toString()
    }
    if (!isNull(this._namedGroups)) {
      jsonObject['namedGroups'] = this._namedGroups.mapToArray(x => x)
    }
    return jsonObject
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return this.toObject()
  }
}


export {FlexRegExp}


class FlexRegExpBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
    this._namedGroups = null
  }

  /**
   *
   * @param {?StringArray} value
   * @return {FlexRegExpBuilder}
   */
  namedGroups(value) {
    if (!isNull(value)) {
      assertType(value instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray, 'params should be a StringArray')
    }
    this._namedGroups = value
    return this
  }

  /**
   * @param {RegExp} value
   * @returns {FlexRegExpBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assertType(isRegex(value), 'value should be a isRegex')
    }
    this._value = value
    return this
  }

  /**
   * @returns {FlexRegExp}
   */
  build() {
    return new FlexRegExp(this._value, this._namedGroups)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexRegExpBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')

    let builder = new FlexRegExpBuilder()

    if (jsonObject['value'] !== undefined && !isNull(jsonObject['value'])) {

      if (new RegExp(/^\/.*\/$/).test(jsonObject['value'])) {

        builder.value(new RegExp(jsonObject['value'].substring(1, jsonObject['value'].length - 1)))

      } else {

        const splited = jsonObject['value'].split('/')
        splited.shift()

        const flags = splited.pop()
        builder.value(new RegExp(splited.join('/'), flags))
      }
    }

    if (jsonObject['namedGroups'] !== undefined && !isNull(jsonObject['namedGroups'])) {
      builder.params(new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...jsonObject['namedGroups'].map(a => a)))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexRegExpBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexRegExp} instance
   * @returns {FlexRegExpBuilder}
   */
  static from(instance) {
    assertType(instance instanceof globalFlexioImport.io.flexio.extended_flex_types.FlexRegExp, 'input should be an instance of FlexRegExp')
    let builder = new FlexRegExpBuilder()
    builder.value(new RegExp(instance.value().toString()))
    builder.namedGroups(instance.namedGroups())
    return builder
  }
}


export {FlexRegExpBuilder}
