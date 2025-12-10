import {assertType, NotOverrideException} from '../../../../assert/index.js'

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

  /**
   * @param {function(XmlHttpRequestDelegate, executionId:string) } clb
   * @return {HttpRequester}
   */
  onResponse(clb) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {function(ProgressEvent, executionId:string) }  clb
   * @return {HttpRequester}
   */
  onUploadProgress(clb) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  abort() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {Promise<ResponseDelegate>}
   */
  async get(callback = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {Promise<ResponseDelegate>}
   */
  async post(callback = null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  async put(callback = null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @param {?string} contentType
   * @param {?string} body
   * @return {Promise<ResponseDelegate>}
   */
  async patch(callback = null, contentType = null, body = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {Promise<ResponseDelegate>}
   */
  async delete(callback = null) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @param {?ExecutorRequesterInterface~executionClb} [callback=null]
   * @return {ResponseDelegate}
   */
  async head(callback = null) {
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

  /**
   * @return {HttpRequester}
   */
  noCache() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @return {HttpRequester}
   */
  json() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   *
   * @param {?string} account
   * @return {HttpRequester}
   */
  XAccount(account) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   *
   * @param {?string} value
   * @return {HttpRequester}
   */
  correlationId(value) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   *
   * @param {?string} token
   * @return {HttpRequester}
   */
  AuthorizationBearer(token) {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @return {Promise<XmlHttpRequestDelegate>}
   */
  async preparedRequest() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @returns {object}
   */
  toObject() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

  /**
   * @returns {object}
   */
  toJSON() {
    throw NotOverrideException.FROM_INTERFACE('HttpRequester')
  }

}
