/**
 * @template TYPE
 * @interface
 */
export class BuilderInterface {
  /**
   *
   * @return {TYPE}
   */
  build() {
  }

  /**
   * @param {object} jsonObject
   * @returns {this}
   */
  static fromObject(jsonObject) {
  }

  /**
   * @param {string} json
   * @returns {this}
   */
  static fromJson(json) {
  }

  /**
   * @param {TYPE} instance
   * @returns {this}
   */
  static from(instance) {
  }
}
