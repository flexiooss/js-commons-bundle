import {FlexMap} from '../__import__flex-types.js'
import {assertType, isNull, isString} from '../__import__assert.js'

/**
 * @extends {FlexMap<*, String>}
 */
export class StringMap extends FlexMap {
  _validate(v) {
    assertType(isString(v) || isNull(v),
      'StringMap: input should be a string')
  }

  /**
   *
   * @return {Object.<*, string>}
   */
  toObject() {
    let obj = Object.create(null)
    for (let [k, v] of this) {
      obj[k] = v
    }
    return obj
  }

  /**
   * @param {StringMap} instance
   * @returns {StringMapBuilder}
   */
  static from(instance) {
    return StringMapBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringMapBuilder}
   */
  static fromObject(jsonObject) {
    return StringMapBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {StringMapBuilder}
   */
  static fromJson(json) {
    return StringMapBuilder.fromJson(json)
  }
}

export class StringMapBuilder {
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
   * @param {IterableIterator<(string|Symbol), string>} entries
   * @return {StringMapBuilder}
   */
  entries(entries) {
    this.__entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringMapBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StringMapBuilder()
    const entries = Object.entries(jsonObject)
    builder.entries(entries)
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringMapBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {StringMapBuilder}
   */
  static from(instance) {
    const builder = new StringMapBuilder()
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {StringMap}
   */
  build() {
    return new StringMap(this.__entries)
  }
}
