import {assertType, isNull, isString} from './__import__assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'

class FlexUrl {

  /**
   * @param {string} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {string}
   */
  value() {
    return this._value
  }

  /**
   * @param {string} value
   */
  withValue(value) {
    let builder = FlexUrlBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._value !== null) {
      jsonObject['value'] = this._value
    }
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   *
   * @return {FlexUrlBuilder}
   */
  static builder() {
    return new FlexUrlBuilder()
  }

  /**
   * @param {object} jsonObject
   * @returns {FlexUrlBuilder}
   */
  static fromObject(jsonObject) {
    return FlexUrlBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {FlexUrlBuilder}
   */
  static fromJson(json) {
    return FlexUrlBuilder.fromJson(json)
  }

  /**
   * @param {FlexUrl} instance
   * @returns {FlexUrlBuilder}
   */
  static from(instance) {
    return FlexUrlBuilder.from(instance)
  }

  /**
   * @param {URL} url
   * @returns {FlexUrlBuilder}
   */
  static fromURL(url) {
    return FlexUrlBuilder.fromURL(url)
  }
}

export {FlexUrl}

class FlexUrlBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param {string} value
   * @returns {FlexUrlBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assertType(isString(value), '__chunckValue should be a string')
      new URL(value)
    }
    this._value = value
    return this
  }

  /**
   * @returns {FlexUrl}
   */
  build() {
    return new FlexUrl(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {FlexUrlBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new FlexUrlBuilder()
    if (jsonObject['value'] !== undefined && jsonObject['value'] !== null) {
      builder.value(jsonObject['value'])
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexUrlBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexUrl} instance
   * @returns {FlexUrlBuilder}
   */
  static from(instance) {
    let builder = new FlexUrlBuilder()
    builder.value(instance.value())
    return builder
  }

  /**
   * @param {URL} url
   * @returns {FlexUrlBuilder}
   */
  static fromURL(url) {
    assertType(
      url instanceof URL,
      'FlexUrlBuilder:fromURL: `url` should be an instance of URL'
    )
    let builder = new FlexUrlBuilder()
    builder.value(url.href)
    return builder
  }
}

export {FlexUrlBuilder}
