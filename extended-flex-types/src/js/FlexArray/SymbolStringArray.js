import {FlexArray} from './__import__flex-types'
import {isNull, isString, isSymbol, assertType} from './__import__assert'

/**
 * @extends {FlexArray<?(string|Symbol)>}
 */
export class SymbolStringArray extends FlexArray {
  _validate(v) {
    assertType(isString(v) || isNull(v) || isSymbol(v), 'SymbolStringArray: input should be a string or null or Symbol')
  }


  /**
   * @param {SymbolStringArray} instance
   * @returns {SymbolStringArrayBuilder}
   */
  static from(instance) {
    return SymbolStringArrayBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {SymbolStringArrayBuilder}
   */
  static fromObject(jsonObject) {
    return SymbolStringArrayBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {SymbolStringArrayBuilder}
   */
  static fromJson(json) {
    return SymbolStringArrayBuilder.fromJson(json)
  }
}

export class SymbolStringArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Array.<?(string|Symbol)> } values
   * @returns {SymbolStringArrayBuilder}
   */
  values(values) {
    this._values = values
    return this
  }

  /**
   * @param { ?(string|Symbol) } value
   * @returns {SymbolStringArrayBuilder}
   */
  pushValue(value) {
    assertType(isString(value) || isNull(value) || isSymbol(value), 'StringArray: input should be a string or null or symbol')
    this._values.push(value)
    return this
  }

  /**
   * @returns {SymbolStringArray}
   */
  build() {
    return new SymbolStringArray(...this._values)
  }

  /**
   * @param {object} jsonObject
   * @returns {SymbolStringArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new SymbolStringArrayBuilder()
    builder._values = []
    jsonObject.forEach((v) => {
      builder._values.push(v)
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {SymbolStringArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {SymbolStringArray} instance
   * @returns {SymbolStringArrayBuilder}
   */
  static from(instance) {
    const builder = new SymbolStringArrayBuilder()
    instance.forEach((v) => {
      builder.pushValue(v)
    })
    return builder
  }
}
