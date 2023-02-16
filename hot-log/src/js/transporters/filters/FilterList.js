import {FlexArray} from '../../../../../flex-types/index.js'
import {assertType} from '../../../../../assert/index.js'
import {implementsFilter} from "./Filter.js";

/**
 * @extends FlexArray<Filter>
 */
export class FilterList extends FlexArray {
  /**
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    assertType(implementsFilter(v), 'should implements Filter')
  }
}