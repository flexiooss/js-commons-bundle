import {isNull} from '../../../assert/index.js'

export class PaginationHelper {
  /**
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static rangeMin(pageIndex, maxByPage, offset = 0) {
    return Math.max((pageIndex * maxByPage + offset),0)
  }

  /**
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static rangeMax(pageIndex, maxByPage, offset = 0) {
    return Math.max(((pageIndex * maxByPage + offset) + maxByPage - 1),0)
  }
  /**
   * @param {number} totalElements
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static printedRangeMin(totalElements, pageIndex, maxByPage, offset = 0) {
    const rangeMin = PaginationHelper.rangeMin(pageIndex, maxByPage, offset)
    return totalElements === 0 ? 0 : totalElements <= rangeMin ? totalElements : rangeMin + 1
  }

  /**
   * @param {number} totalElements
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static printedRangeMax(totalElements, pageIndex, maxByPage, offset = 0) {
    const rangeMax = PaginationHelper.rangeMax(pageIndex, maxByPage, offset)
    return totalElements <= rangeMax ? totalElements : rangeMax + 1
  }


  /**
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @param {function(rangeMin:string, rangeMax:string)} format
   * @return {number}
   */
  static getRange(pageIndex, maxByPage, offset= 0, format = null) {
    if (isNull(format)) {
      format = (rangeMin, rangeMax) => `${rangeMin}-${rangeMax}`
    }
    return format.call(null,
      this.rangeMin(pageIndex, maxByPage, offset),
      this.rangeMax(pageIndex, maxByPage, offset)
    )
  }
}
