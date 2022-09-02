import {assertType} from '../../../../assert'

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
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {Promise<ResponseDelegate>}
   */
  get(callback) {
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {Promise<ResponseDelegate>}
   */
  post(callback, contentType = null, body = null) {
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  put(callback, contentType = null, body = null) {
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  patch(callback, contentType = null, body = null) {
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {Promise<ResponseDelegate>}
   */
  delete(callback) {
    throw new Error('should be override')
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  head(callback) {
    throw new Error('should be override')
  }

  /**
   * @param {string} name
   * @param {string} value
   * @return {HttpRequester}
   */
  parameter(name, value) {
    throw new Error('should be override')
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {HttpRequester}
   */
  arrayParameter(name, values) {
    throw new Error('should be override')
  }

  /**
   * @return {XmlHttpRequester}
   * @param {URLSearchParams} urlSearchParams
   */
  parametersFromURLSearchParams(urlSearchParams) {
    throw new Error('should be override')
  }

  /**
   * @param {string} name
   * @param {string} value
   * @return {HttpRequester}
   */
  header(name, value) {
    throw new Error('should be override')
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {HttpRequester}
   */
  arrayHeader(name, values) {
    throw new Error('should be override')
  }

  /**
   * @param {string} path
   * @return {HttpRequester}
   */
  path(path) {
    throw new Error('should be override')
  }
}
