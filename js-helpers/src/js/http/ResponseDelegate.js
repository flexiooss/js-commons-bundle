/**
 * @interface
 */
export class ResponseDelegate {
  /**
   * @param inst
   * @return {boolean}
   */
  static isResponseDelegate(inst) {
    return inst instanceof ResponseDelegate
  }

  /**
   * @param inst
   * @throws {TypeError}
   */
  static assertIsResponseDelegate(inst) {
    if (!ResponseDelegate.isResponseDelegate(inst)) {
      throw new TypeError('`inst` should be `ResponseDelegate`')
    }
  }

  /**
   * @return {number}
   */
  code() {
    throw new Error('should be override')
  }

  /**
   * @return {Blob}
   */
  payload() {
    throw new Error('should be override')
  }

  /**
   *
   * @param {string} name
   * @return {Array<string>}
   */
  header(name) {
    throw new Error('should be override')
  }

  /**
   * @return {string}
   */
  contentType() {
    throw new Error('should be override')
  }
}
