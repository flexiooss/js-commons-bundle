import {assertInstanceOf, assertType, isEmpty, isNull, isString, TypeCheck} from './__import__assert.js'
import {deepFreezeSeal} from './__import__js-generator-helpers.js'

class FlexUrl {
  /**
   * @type {String}
   */
  #href
  /**
   * @type {?String}
   */
  #protocol
  /**
   * @type {?String}
   */
  #username
  /**
   * @type {?String}
   */
  #password
  /**
   * @type {?String}
   */
  #hostname
  /**
   * @type {?String}
   */
  #port
  /**
   * @type {?String}
   */
  #pathname
  /**
   * @type {?String}
   */
  #search
  /**
   * @type {String}
   */
  #hash

  /**
   * @param {string} value
   * @private
   */
  constructor(value) {
    this.#href = value
    this.#parseStringUrl()
    deepFreezeSeal(this)
  }

  /**
   * @return {FlexUrl}
   */
  #parseStringUrl() {
    const urlRE = /^(?:([\w.+-]+):)?\/{2}(?:(?:([\w-]+):)?(?:([\w-]+)@))?([.\w-]+)(?::([\w-]+))?(\/[\w\/%&(){}-]*)?(\?[\w;:@&=%,\[\]-]*)?(#[\w_-]+)?/
    const matches = TypeCheck.assertIsString(this.#href).match(urlRE)
    if (!isNull(matches)) {
      this.#protocol = !isEmpty(matches[1]) ? matches[1] : null
      this.#username = !isEmpty(matches[2]) ? matches[2] : null
      this.#password = !isEmpty(matches[3]) ? matches[3] : null
      this.#hostname = !isEmpty(matches[4]) ? matches[4] : null
      this.#port = !isEmpty(matches[5]) ? matches[5] : null
      this.#pathname = !isEmpty(matches[6]) ? matches[6] : null
      this.#search = !isEmpty(matches[7]) ? matches[7] : null
      this.#hash = !isEmpty(matches[8]) ? matches[8] : null
    } else {
      throw new Error('string not parsable as URL::' + this.#href)
    }
    return this
  }

  /**
   * @return {?String}
   */
  protocol() {
    return this.#protocol;
  }

  /**
   * @return {?String}
   */
  username() {
    return this.#username;
  }

  /**
   * @return {?String}
   */
  password() {
    return this.#password;
  }

  /**
   * @return {?String}
   */
  hostname() {
    return this.#hostname;
  }

  /**
   * @return {?string[]}
   */
  hostnames() {
    return isNull(this.#hostname) ? null : this.#hostname.split('.');
  }

  /**
   * @return {*}
   */
  host() {
    return (this.#hostname ?? '') + (isNull(this.#port) ? '' : (':' + this.#port))
  }

  /**
   * @return {?String}
   */
  port() {
    return this.#port;
  }

  /**
   * @return {?String}
   */
  pathname() {
    return this.#pathname;
  }

  /**
   * @param {boolean} [clean=false]
   * @return {?String}
   */
  search(clean = false) {
    return (clean) ? this.#search.replace(/^\?/, '') : this.#search;
  }

  /**
   * @param {boolean} [clean=false]
   * @return {String}
   */
  hash(clean = false) {
    return (clean) ? this.#hash.replace(/^#/, '') : this.#hash;
  }

  /**
   * @return {?URLSearchParams}
   */
  urlSearchParams() {
    if (!isNull(this.search())) {
      return new URLSearchParams(this.search())
    }
    return null
  }

  /**
   * @return {string}
   */
  origin() {
    let origin = this.protocol()
    origin += "://"
    origin += !isNull(this.#username) ? this.#username : ''
    origin += !isNull(this.#password) ? ':' + this.#password : ''
    origin += !isNull(this.#username) ? '@' : ''
    origin += this.host()
    return origin
  }

  /**
   * @return {string}
   */
  value() {
    return this.href()
  }

  /**
   * @return {string}
   */
  href() {
    return this.#href
  }

  toString() {
    return this.href()
  }

  /**
   * @return {URL}
   */
  toURL() {
    return new URL(this.#href)
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
    if (this.#href !== null) {
      jsonObject['href'] = this.#href
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
   * @type {?string}
   */
  #href = null

  /**
   * @param {string} value
   * @returns {FlexUrlBuilder}
   */
  href(value) {
    if (!isNull(value)) {
      assertType(isString(value), 'value should be a string')
      new URL(value)
    }
    this.#href = value
    return this
  }

  /**
   * @param {string} value
   * @returns {FlexUrlBuilder}
   * @deprecated
   */
  value(value) {
    return this.href(value)
  }

  /**
   * @returns {FlexUrl}
   */
  build() {
    return new FlexUrl(this.#href)
  }

  /**
   * @param {object} jsonObject
   * @returns {FlexUrlBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new FlexUrlBuilder()
    if (jsonObject['href'] !== undefined && jsonObject['href'] !== null) {
      builder.href(jsonObject['href'])
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
    builder.href(instance.href())
    return builder
  }

  /**
   * @param {URL} url
   * @returns {FlexUrlBuilder}
   */
  static fromURL(url) {
    assertInstanceOf(url, URL, 'URL')
    let builder = new FlexUrlBuilder()
    builder.href(url.href)
    return builder
  }
}

export {FlexUrlBuilder}
