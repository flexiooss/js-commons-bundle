import {FlexArray} from '../__import__flex-types'
import {isNull, isString, assertType} from '../__import__assert'

/**
 * @extends {FlexArray<?string>}
 */
export class StringArray extends FlexArray {
  _validate(v) {
    assertType(isString(v) || isNull(v), 'StringArray: input should be a string or null')
  }

  /**
   *
   * @param { Array.<string> } values
   * @return {StringArray}
   */
  with(values) {
    return new StringArrayBuilder()
      .values(values)
      .build()
  }

  /**
   *
   * @param { Array.<string> } values
   * @return {StringArray}
   */
  withPush(values) {
    const builder = StringArrayBuilder.from(this)
    values.forEach((v) => {
      builder.pushValue(v)
    })
    return builder.build()
  }

  /**
   * @param {StringArray} instance
   * @returns {StringArrayBuilder}
   */
  static from(instance) {
    return StringArrayBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayBuilder}
   */
  static fromObject(jsonObject) {
    return StringArrayBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {StringArrayBuilder}
   */
  static fromJson(json) {
    return StringArrayBuilder.fromJson(json)
  }
}

export class StringArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Array.<string> } values
   * @returns {StringArrayBuilder}
   */
  values(values) {
    this._values = values
    return this
  }

  /**
   * @param { string } value
   * @returns {StringArrayBuilder}
   */
  pushValue(value) {
    assertType(isString(value) || isNull(value), 'StringArray: input should be a string or null')
    this._values.push(value)
    return this
  }

  /**
   * @returns {StringArray}
   */
  build() {
    return new StringArray(...this._values)
  }

  /**
   * @param {object} jsonObject
   * @returns {StringArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StringArrayBuilder()
    builder._values = []
    jsonObject.forEach((v) => {
      builder._values.push(v)
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {StringArray} instance
   * @returns {StringArrayBuilder}
   */
  static from(instance) {
    const builder = new StringArrayBuilder()
    instance.forEach((v) => {
      builder.pushValue(v)
    })
    return builder
  }
}
