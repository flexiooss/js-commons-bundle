import {assertType, NotOverrideException} from '../../../../assert'

/**
 * @interface
 */
export class HttpRequester {
  /**
   * @param inst
   * @return {boolean}
   */
  static isHttpRequester(inst) {
    return inst instanceof HttpRequester
  }

  /**
   * @param {HttpRequester} inst
   * @throws {TypeError}
   * @return {HttpRequester}
   */
  static assertIsHttpRequester(inst) {
    assertType(HttpRequester.isHttpRequester(inst), '`inst` should be `HttpRequester`')
    return inst
  }

  abort() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {Promise<ResponseDelegate>}
   */
  async get(callback=null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {Promise<ResponseDelegate>}
   */
  async post(callback=null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  async put(callback=null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  async patch(callback=null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {Promise<ResponseDelegate>}
   */
  async delete(callback=null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {ResponseDelegate}
   */
  async head(callback=null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {string} name
   * @param {string} value
   * @return {HttpRequester}
   */
  parameter(name, value) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {HttpRequester}
   */
  arrayParameter(name, values) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @return {XmlHttpRequester}
   * @param {URLSearchParams} urlSearchParams
   */
  parametersFromURLSearchParams(urlSearchParams) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {string} name
   * @param {string} value
   * @return {HttpRequester}
   */
  header(name, value) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {HttpRequester}
   */
  arrayHeader(name, values) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {string} path
   * @return {HttpRequester}
   */
  path(path) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }
}
