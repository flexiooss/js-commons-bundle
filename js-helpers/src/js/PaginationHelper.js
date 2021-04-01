import {TypeCheck} from '../../../assert'

export class PaginationHelper {
  /**
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static rangeMin(pageIndex, maxByPage, offset) {
    return pageIndex * maxByPage + offset
  }

  /**
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {number}
   */
  static rangeMax(pageIndex, maxByPage, offset) {
    return (pageIndex * maxByPage + offset) + maxByPage - 1
  }

  /**
   * @param {number} totalElements
   * @param {number} pageIndex
   * @param {number} maxByPage
   * @param {number} offset
   * @return {string}
   */
  static printedRange(totalElements, pageIndex, maxByPage, offset) {
    const rangeMin = PaginationHelper.rangeMin(pageIndex, maxByPage, offset)
    const rangeMax = PaginationHelper.rangeMax(pageIndex, maxByPage, offset)
    return `${totalElements === 0 ? 0 : rangeMin + 1}-${totalElements < rangeMax ? totalElements : rangeMax + 1}`
  }

  /**
   * @param {number} page
   * @param {number} maxByPage
   * @param {number} [offset=0]
   * @returns {string}
   */
  static getRange(page, maxByPage, offset = 0) {
    TypeCheck.assertIsNumber(page)
    TypeCheck.assertIsNumber(maxByPage)
    TypeCheck.assertIsNumber(offset)

    const rangeMin = PaginationHelper.rangeMin(page, maxByPage, offset)
    const rangeMax = PaginationHelper.rangeMax(page, maxByPage, offset)

    return rangeMin + '-' + rangeMax
  }
}