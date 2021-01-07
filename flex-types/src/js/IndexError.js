export class IndexError extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY(key) {
    return new IndexError(
      IndexError.toString(
        'Array have not this index',
        key
      )
    )
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY_GT_LENGTH(key) {
    return new IndexError(
      IndexError.toString(
        'Array have not this index, array length less than key',
        key
      )
    )
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_MAP_KEY(key) {
    return new IndexError(
      IndexError.toString(
        'Map have not this index',
        key
      )
    )
  }

  /**
   * @param {string} name
   * @return {IndexError}
   */
  static BAD_ENUM_NAME(name) {
    return new IndexError(
      IndexError.toString(
        'Enum have not this index',
        name
      )
    )
  }

  static toString(message, key) {
    return `${message} : ${key} `
  }
}


