import {isNull} from '../__import__assert'


export class DocumentCookieHandler {
  /**
   * @param {CookieStorageConfig} config
   */
  constructor(config) {
    /**
     * @type {CookieStorageConfig}
     * @private
     */
    this.__config = config
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {DocumentCookieHandler}
   */
  write(key, value) {
    /**
     * @type {string[]}
     */
    const cookies = this.__configToCookieString(key, value)

    this
      .remove(key)
      .__ensureCookieSize(cookies, key)

    for (/**@type {string}*/const cookieString of cookies) {
      this.__writeCookie(cookieString)
    }

    return this
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {string[]}
   * @private
   */
  __configToCookieString(key, value) {
    /**
     * @type {string[]}
     */
    const cookies = []
    /**
     * @type {string[]}
     */
    const contentChunks = this.__chunksFor(
      btoa(value),
      this.__config.chunkLength()
    )

    for (let i = 0; i < contentChunks.length; i++) {
      cookies.push(
        this.__buildCookieString(
          this.__cookieContentKey(this.__ensureNamespace(key), i),
          contentChunks[i]))
    }

    return cookies
  }

  /**
   * @param {string} key
   * @param {string} contentChunk
   * @return {string}
   * @private
   */
  __buildCookieString(key, contentChunk) {
    /**
     * @type {string}
     */
    let cookieString = `${key}=${contentChunk}`

    if (!isNull(this.__config.cookieConfig().domain())) {
      cookieString += `;domain=${this.__config.cookieConfig().domain()}`
    }
    if (!isNull(this.__config.cookieConfig().path())) {
      cookieString += `;path=${this.__config.cookieConfig().path()}`
    }
    if (!isNull(this.__config.cookieConfig().expires())) {
      cookieString += `;expires=${this.__config.cookieConfig().expires().toUTCString()}`
    }
    if (!isNull(this.__config.cookieConfig().maxAge())) {
      cookieString += `;max-age=${this.__config.cookieConfig().maxAge()}`
    }
    if (this.__config.cookieConfig().secure()) {
      cookieString += `;secure`
    }
    if (!isNull(this.__config.cookieConfig().samesite())) {
      cookieString += `;samesite=${this.__config.cookieConfig().samesite()}`
    }

    return cookieString
  }

  /**
   * @param {string} str
   * @param {number} size
   * @return {string[]}
   * @private
   */
  __chunksFor(str, size) {
    const strLength = str.length
    const numChunks = Math.ceil(strLength / size)
    const chunks = new Array(numChunks)

    let i = 0
    let o = 0

    for (; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }

    return chunks
  }


  /**
   * @param {string} cookieString
   * @return {DocumentCookieHandler}
   * @private
   */
  __writeCookie(cookieString) {
    this.__config.document().cookie = cookieString
    return this
  }

  /**
   * @param {string[]} cookies
   * @param {string}  key
   * @return {DocumentCookieHandler}
   * @private
   */
  __ensureCookieSize(cookies, key) {
    this.__writeCookie(
      this.__buildCookieString(
        this.__ensureNamespace(this.__cookieSizeKey(key)),
        cookies.length.toString()
      )
    )
    return this
  }

  /**
   * @param {string} key
   * @return {string}
   * @private
   */
  __cookieSizeKey(key) {
    return `${key}${this.__config.cookieSizeSuffix()}`
  }

  /**
   * @param {string} key
   * @param {Number} num
   * @return {string}
   * @private
   */
  __cookieContentKey(key, num) {
    return `${key}${this.__config.cookieSizeSeparator()}${num}`
  }

  /**
   * @param {string} key
   * @return {DocumentCookieHandler}
   */
  remove(key) {
    /**
     * @type {number}
     */
    let size = this.__chunkCount(key)
    if (size) {

      for (let i = 0; i < size; ++i) {
        this.__removeCookie(this.__ensureNamespace(this.__cookieContentKey(key, i)))
      }
      this.__removeCookie(this.__ensureNamespace(this.__cookieSizeKey(key)))
    }

    return this
  }

  /**
   * @param {string} cookieKey
   * @return {DocumentCookieHandler}
   * @private
   */
  __removeCookie(cookieKey) {
    this.__config.document().cookie = cookieKey + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    return this
  }

  /**
   * @param {string} name
   * @return {boolean}
   */
  has(name) {
    /**
     * @type {RegExp}
     */
    const regexp = new RegExp('(?:^|;\\s*)' + this.__ensureNamespace(name) + this.__config.cookieSizeSuffix() + '=', 'g')

    return !isNull(this.__config.document().cookie.match(regexp))
  }

  /**
   * @return {DocumentCookieHandler}
   */
  cleanByNamespace() {
    if (!isNull(this.__config.namespace())) {

      const cookies = this.__config.document().cookie

      const regexp = new RegExp('(?:^|;\\s*)(' + this.__config.namespace() + this.__config.cookieNamespaceSeparator() + '[\\w\\d\\s_-]*)=', 'g')
      let matches = null

      while ((matches = regexp.exec(cookies)) !== null) {
        this.__removeCookie(matches[1])
      }
    } else {
      throw new Error('Cookie namespace can not be cleared : namespace is Null')
    }
    return this
  }

  /**
   * @param {string} cookieKey
   * @return {?string}
   * @private
   */
  __chunkValue(cookieKey) {
    /**
     * @type {string}
     */
    let v = decodeURIComponent(
      this.__config.document().cookie.replace(
        new RegExp('(?:(?:^|.*;\\s*)' + cookieKey + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')
    )
    return (v !== '') ? v : null
  }

  /**
   * @param {string} name
   * @return {string}
   * @private
   */
  __ensureNamespace(name) {
    return (!isNull(this.__config.namespace()))
      ? this.__config.namespace() + this.__config.cookieNamespaceSeparator() + name
      : name
  }

  /**
   * @param {string} name
   * @return {number}
   * @private
   */
  __chunkCount(name) {
    let size = this.__chunkValue(this.__ensureNamespace(this.__cookieSizeKey(name)))
    return (!isNull(size)) ? parseInt(size) : 0
  }

  /**
   *
   * @param {string} name
   * @return {?string}
   */
  value(name) {
    /**
     * @type {string[]}
     */
    const chunks = []
    let size = this.__chunkCount(name)
    if (size) {

      for (let i = 0; i <= size; ++i) {
        let v = this.__chunkValue(this.__ensureNamespace(this.__cookieContentKey(name, i)))

        if (!isNull(v)) {
          chunks.push(v)
        }
      }
    }

    /**
     * @type {string}
     */
    const ret = atob(chunks.join(''))

    return (ret === '') ? null : ret
  }
}
