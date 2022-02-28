import {HotLogTransporterList} from "./HotLogTransporterList";
import {Log} from "../Log";
import {HotLogLevel} from "../HotLogLevel";
import {assertInstanceOf, isNull} from '../../../../assert'

export class TransporterHandler {
  /**
   * @type {HotLogTransporterList}
   */
  #transporters = new HotLogTransporterList().freeze()

  /**
   * @param {HotLogTransporter} transporter
   * @return {TransporterHandler}
   */
  addTransporter(transporter) {
    this.#transporters = this.#transporters.withPush(transporter)
    return this
  }

  /**
   * @return {HotLogTransporterList}
   */
  transporters() {
    return this.#transporters
  }

  /**
   * @param {Log} log
   * @param {?HotLogLevel} threshold
   * @return {TransporterHandler}
   */
  commit(log, threshold) {
    assertInstanceOf(log, Log, 'Log')
    if (!isNull(threshold)) {
      assertInstanceOf(threshold, HotLogLevel, 'HotLogLevel')
    }
    this.#transporters.forEach(transporter => {
      transporter.commit(log, threshold)
    })
    return this
  }

}