export class ContentRangeHelper {
  /**
   * @param {string} contentRange
   * @return {number}
   */
  static getTotal(contentRange) {
    return parseInt(contentRange.split('/')[1])
  }

  /**
   * @param {string} contentRange
   * @return {?number}
   */
  static getRangeMin(contentRange) {
    const regex = /(?:\D|^)(\d+)-\d+\/\d+/
    const match = contentRange.match(regex)

    if (match) {
      return parseInt(match[1])
    } else {
      return null
    }
  }
  /**
   * @param {string} contentRange
   * @return {?number}
   */
  static getRangeMax(contentRange) {
    const regex = /(?:\D|^)\d+-(\d+)\/\d+/
    const match = contentRange.match(regex)

    if (match) {
      return parseInt(match[1])
    } else {
      return null
    }
  }
}
