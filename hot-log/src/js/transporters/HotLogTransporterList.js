import {FlexArray} from '../../../../flex-types'
import {assertType} from '../../../../assert'
import {implementsHotLogTransporter} from "./HotLogTransporter";

/**
 * @extends FlexArray<HotLogTransporter>
 */
export class HotLogTransporterList extends FlexArray {
  /**
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    assertType(implementsHotLogTransporter(v), 'should implements HotLogTransporter')
  }
}