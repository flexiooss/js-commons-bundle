import {deepFreezeSeal} from './__import__js-generator-helpers'

class Any {

  /**
   * @param {*} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {*}
   */
  value() {
    return this._value
  }

  /**
   * @param {*} value
   * @return {Any}
   */
  withValue(value) {
    return new AnyBuilder()
      .value(value)
      .build()
  }

  /**
   * @return {Object}
   */
  toObject() {
    throw new Error('Any not serializable')
  }

  /**
   * @returns {object}
   */
  toJSON() {
    throw new Error('Any not serializable')
  }

  /**
   *
   * @return {AnyBuilder}
   */
  static builder() {
    return new AnyBuilder()
  }

  /**
   * @param {object} jsonObject
   * @returns {AnyBuilder}
   */
  static fromObject(jsonObject) {
    return AnyBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {AnyBuilder}
   */
  static fromJson(json) {
    return AnyBuilder.fromJson(json)
  }

  /**
   * @param {Any} instance
   * @returns {AnyBuilder}
   */
  static from(instance) {
    return AnyBuilder.from(instance)
  }

}

export {Any}

class AnyBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param {*} value
   * @returns {AnyBuilder}
   */
  value(value) {

    this._value = value
    return this
  }

  /**
   * @returns {Any}
   */
  build() {
    return new Any(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {AnyBuilder}
   */
  static fromObject(jsonObject) {
    throw new Error('Any not serializable')
  }

  /**
   * @param {string} json
   * @returns {AnyBuilder}
   */
  static fromJson(json) {
    throw new Error('Any not serializable')
  }

  /**
   * @param {Any} instance
   * @returns {AnyBuilder}
   */
  static from(instance) {
    throw new Error('Any not serializable')
  }

}

export {AnyBuilder}
