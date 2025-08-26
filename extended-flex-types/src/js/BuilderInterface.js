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
   * @returns {BuilderInterface}
   */
  static fromObject(jsonObject) {
  }

  /**
   * @param {string} json
   * @returns {BuilderInterface}
   */
  static fromJson(json) {
  }

  /**
   * @param {TYPE} instance
   * @returns {BuilderInterface}
   */
  static from(instance) {
  }
}
