export class AcceptRangeHelper {
  /**
   * @param {string} acceptRange
   * @return {number}
   */
  static getRange(acceptRange) {
    return parseInt(acceptRange.match(/\d+$/)[0])
  }
}
