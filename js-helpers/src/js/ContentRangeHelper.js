export class ContentRangeHelper {
  /**
   * @param {string} contentRange
   * @return {number}
   */
  static getTotal(contentRange) {
    return parseInt(contentRange.split('/')[1])
  }
}
