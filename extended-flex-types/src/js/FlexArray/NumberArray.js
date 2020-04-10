import {FlexArray} from '../__import__flex-types'
import {isNull, isNumber, assertType} from '../__import__assert'

/**
 * @extends {FlexArray<?Number>}
 */
export class NumberArray extends FlexArray {
  _validate(v) {
    assertType(isNumber(v) || isNull(v), 'NumberArray: input should be a Number or null')
  }

  /**
   * @returns {NumberArrayBuilder}
   */
  static builder() {
    return new NumberArrayBuilder()
  }

  /**
   * @param {NumberArray} instance
   * @returns {NumberArrayBuilder}
   */
  static from(instance) {
    return NumberArrayBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {NumberArrayBuilder}
   */
  static fromObject(jsonObject) {
    return NumberArrayBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {NumberArrayBuilder}
   */
  static fromJson(json) {
    return NumberArrayBuilder.fromJson(json)
  }

}

export class NumberArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Array.<Number> } values
   * @returns {NumberArrayBuilder}
   */
  values(values) {
    this._values = values
    return this
  }

  /**
   * @param { Number } value
   * @returns {NumberArrayBuilder}
   */
  pushValue(value) {
    assertType(isNumber(value) || isNull(value), 'NumberArrayBuilder: input should be a Number or null')
    this._values.push(value)
    return this
  }

  /**
   * @returns {NumberArray}
   */
  build() {
    const a = new NumberArray()
    for (const v of this._values) {
      a.push(v)
    }
    return a
  }

  /**
   * @param {object} jsonObject
   * @returns {NumberArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new NumberArrayBuilder()
    builder._values = []
    jsonObject.forEach((v) => {
      builder._values.push(v)
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {NumberArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {NumberArray} instance
   * @returns {NumberArrayBuilder}
   */
  static from(instance) {
    const builder = new NumberArrayBuilder()
    instance.forEach((v) => {
      builder.pushValue(v)
    })
    return builder
  }
}
