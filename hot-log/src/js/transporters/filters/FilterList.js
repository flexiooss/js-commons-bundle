import {FlexArray} from '../../../../../flex-types'
import {assertType} from '../../../../../assert'
import {implementsFilter} from "./Filter";

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