import {assertType, isFile, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'

/**
 * @extends {FlexArray<?File>}
 */
export class FileArray extends FlexArray {
  /**
   * @param {FileArray} instance
   * @returns {FileArrayBuilder}
   */
  static from(instance) {
    return FileArrayBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FileArrayBuilder}
   */
  static fromObject(jsonObject) {
    return FileArrayBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {FileArrayBuilder}
   */
  static fromJson(json) {
    return FileArrayBuilder.fromJson(json)
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(isFile(element), 'element should be a file')
    }
  }

  /**
   *
   * @param {?FileArray} to
   * @returns {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsPrimitives(this, to)
  }
}

export class FileArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param {object} jsonObject
   * @returns {FileArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new FileArrayBuilder()
    builder._values = []
    jsonObject.forEach((v) => {
      builder._values.push(v)
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {FileArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FileArray} instance
   * @returns {FileArrayBuilder}
   */
  static from(instance) {
    const builder = new FileArrayBuilder()
    instance.forEach((v) => {
      builder.pushValue(v)
    })
    return builder
  }

  /**
   * @param { Array.<?File> } values
   * @returns {FileArrayBuilder}
   */
  values(values) {
    this._values = values
    return this
  }

  /**
   * @param {?File} value
   * @returns {FileArrayBuilder}
   */
  pushValue(value) {
    assertType(isFile(value), 'FileArray: input should be a file or null')
    this._values.push(value)
    return this
  }

  /**
   * @returns {FileArray}
   */
  build() {
    return new FileArray(...this._values)
  }
}

