import {FlexArray} from '../../../../flex-types/index.js'
import {assertType} from '../../../../assert/index.js'
import {implementsHotLogTransporter} from './HotLogTransporter.js'

/**
 * @extends {FlexArray<HotLogTransporter>}
 */
export class HotLogTransporterList extends FlexArray {
  /**
   * @param {*} v
   * @protected
   * @throws Error
   * @returns {void}
   */
  _validate(v) {
    assertType(implementsHotLogTransporter(v), 'should implements HotLogTransporter')
  }
}