import {BaseException} from "../../../js-type-helpers/index.js";

export class IndexError extends BaseException {

  realName() {
    return 'IndexError'
  }

  /**
   * @param {string|number} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY(key) {
    return new IndexError(`Array have not this index: ${key}`)
  }

  /**
   * @param {string|number} key
   * @return {IndexError}
   */
  static BAD_ARRAY_KEY_GT_LENGTH(key) {
    return new IndexError(`Array have not this index, array length less than key: ${key}`)
  }

  /**
   * @param {string} key
   * @return {IndexError}
   */
  static BAD_MAP_KEY(key) {
    return new IndexError(`Map have not this index: ${key}`)
  }

  /**
   * @param {string} enumName
   * @param {string} name
   * @return {IndexError}
   */
  static BAD_ENUM_NAME(enumName, name) {
    return new IndexError(`${enumName}:: Enum have not this index: ${name}`)
  }

}


