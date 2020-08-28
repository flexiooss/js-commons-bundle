export class NotOverrideException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
  }

  /**
   * @param {string} name
   * @return {IndexError}
   */
  static FROM_INTERFACE(name) {
    return new NotOverrideException(`Method not override at ${name} interface`)
  }
  /**
   * @param {string} name
   * @return {IndexError}
   */
  static FROM_ABSTRACT(name) {
    return new NotOverrideException(`Method not override at ${name} abstract`)
  }


  toString() {
    return ` ${this.name} --- ${this.message} `
  }
}


