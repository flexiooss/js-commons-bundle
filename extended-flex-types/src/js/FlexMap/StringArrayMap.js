import {FlexMap} from './__import__flex-types'
import {assertType, isObject, isString} from './__import__assert'
import {StringArray} from './__import__flex-types'

/**
 * @extends {FlexMap<?StringArray>}
 */
export class StringArrayMap extends FlexMap {
  _validate(v) {
    assertType(v instanceof StringArray, 'StringArrayMap: input should be a StringArray')
  }

  /**
   *
   * @return {Object.<*, Array.<string>>}
   */
  toObject() {
    let obj = Object.create(null)
    for (let [k, v] of this) {
      obj[k] = v.toObject()
    }
    return obj
  }

  /**
   * @param {StringArrayMap} instance
   * @returns {StringArrayMapBuilder}
   */
  static from(instance) {
    return StringArrayMapBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayMapBuilder}
   */
  static fromObject(jsonObject) {
    return StringArrayMapBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {StringArrayMapBuilder}
   */
  static fromJson(json) {
    return StringArrayMapBuilder.fromJson(json)
  }
}

export class StringArrayMapBuilder {
  constructor() {
    /**
     *
     * @type {IterableIterator<(string|Symbol), StringArray>}
     * @private
     */
    this.__entries = null
  }

  /**
   *
   * @param {IterableIterator<(string|Symbol), StringArray>} entries
   * @return {StringArrayMapBuilder}
   */
  entries(entries) {
    this.__entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayMapBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')

    const builder = new StringArrayMapBuilder()
    const entries = Object.entries(jsonObject)
    for (const value of entries) {
      value[1] = new StringArray(...value[1])
    }
    builder.entries(entries)
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringArrayMapBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')

    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {StringArrayMap} instance
   * @returns {StringArrayMapBuilder}
   */
  static from(instance) {

    assertType(instance instanceof StringArrayMap, 'input should be an instance of StringArrayMap')
    const builder = new StringArrayMapBuilder()
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {StringArrayMap}
   */
  build() {
    return new StringArrayMap(this.__entries)
  }
}
