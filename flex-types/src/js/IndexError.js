export class IndexError extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
    this.key = null
  }

  /**
   *
   * @param {string} key
   * @return {IndexError}
   */
  setKey(key) {
    this.key = key
    return this
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY(key) {
    return new IndexError('Array have not this index')
      .setKey(key)
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY_GT_LENGTH(key) {
    return new IndexError('Array have not this index, array length less than key')
      .setKey(key)
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_MAP_KEY(key) {
    return new IndexError('Map have not this index')
      .setKey(key)
  }

  /**
   * @param {string} name
   * @return {IndexError}
   */
  static BAD_ENUM_NAME(name) {
    return new IndexError('Enum have not this index')
      .setKey(name)
  }

  toString() {
    return ` ${this.name} --- ${this.message} : ${this.key} `
  }
}


