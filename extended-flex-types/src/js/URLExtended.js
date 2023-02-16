import {assertType,  isNull, isString} from './__import__assert.js'
import {globalFlexioImport} from './__import__global-import-registry.js'

export class URLExtended extends URL {

  /**
   * @return {Object}
   */
  toObject() {
    return {
      href: this.href
    }
  }

  /**
   * @return {FlexUrl}
   */
  toFlexUrl() {
    return globalFlexioImport.io.flexio.extended_flex_types.FlexUrl.builder().value(this.href).build()
  }

  /**
   *
   * @return {Object}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   *
   * @return {URLExtendedBuilder}
   */
  static builder() {
    return new URLExtendedBuilder()
  }

  /**
   * @param {Object} jsonObject
   * @returns {URLExtendedBuilder}
   */
  static fromObject(jsonObject) {
    return URLExtendedBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {URLExtendedBuilder}
   */
  static fromJson(json) {
    return URLExtendedBuilder.fromJson(json)
  }

  /**
   * @param {URLExtended} instance
   * @returns {URLExtendedBuilder}
   */
  static from(instance) {
    return URLExtendedBuilder.from(instance)
  }

  /**
   *
   * @param {FlexUrl} flexUrl
   * @returns {URLExtendedBuilder}
   */
  static fromFlexUrl(flexUrl) {
    return URLExtendedBuilder.fromFlexUrl(flexUrl)
  }
}

export class URLExtendedBuilder {
  constructor() {
    /**
     *
     * @type {?string}
     * @private
     */
    this.__href = null
  }

  /**
   *
   * @param {?string} href
   * @return {URLExtendedBuilder}
   */
  href(href) {
    assertType(isNull(href) || isString(href), 'URLExtendedBuilder:href: arg should be a string or null')
    this.__href = href
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {URLExtendedBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new URLExtendedBuilder()
    builder.href(jsonObject.href)
    return builder
  }

  /**
   * @param {string} json
   * @returns {URLExtendedBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {URLExtended} instance
   * @returns {URLExtendedBuilder}
   */
  static from(instance) {
    const builder = new URLExtendedBuilder()
    builder.href(instance.href)
    return builder
  }

  /**
   *
   * @param {FlexUrl} flexUrl
   * @returns {URLExtendedBuilder}
   */
  static fromFlexUrl(flexUrl) {
    assertType(flexUrl instanceof globalFlexioImport.io.flexio.extended_flex_types.FlexUrl,
      'URLExtendedBuilder:fromFlexUrl: argument should be a FlexUrl'
    )
    const builder = new URLExtendedBuilder()
    builder.href(flexUrl.value())
    return builder
  }

  /**
   * @returns {URLExtended}
   */
  build() {
    return new URLExtended(this.__href)
  }
}
