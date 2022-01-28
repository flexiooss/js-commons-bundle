import {FilterList} from "./FilterList";
import {assertInstanceOf, assertType, isNull} from "../../../../../assert";

export class FilterListHandler {
  /**
   * @type {FilterList}
   */
  #filters = null

  /**
   * @param {FilterList} filters
   * @return {FilterListHandler}
   */
  replaceFilters(filters) {
    if (!isNull(filters)) {
      assertInstanceOf(filters, FilterList, 'FilterList')
    }
    this.#filters = filters
    return this
  }

  /**
   * @return {boolean}
   */
  hasFilters() {
    return !isNull(this.#filters) && this.#filters.length > 0
  }

  /**
   * @param {Log} log
   * @return {boolean}
   */
  match(log) {
    if (!this.hasFilters()) {
      return true
    }

    for (/**@type{Filter}*/const filter of this.#filters) {
      if (filter.match(log)) {
        return true
      }
    }
    return false
  }
}