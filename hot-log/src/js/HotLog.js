import {isNull} from '../../../assert'
import {HotLogTransporterList} from "./transporters/HotLogTransporterList";
import {TransporterHandler} from "./transporters/TransporterHandler";

export class HotLog {
  /**
   * @type {?HotLog}
   */
  static #instance = null
  /**
   * @type {TransporterHandler}
   */
  #transporters = new TransporterHandler()

  /**
   * @return {HotLog}
   */
  static getHotLog() {
    if (isNull(HotLog.#instance)) {
      HotLog.#instance = new HotLog()
    }
    return HotLog.#instance
  }

  /**
   * @param {HotLogTransporter} transporter
   * @return {HotLog}
   */
  addTransporter(transporter) {
    this.#transporters.addTransporter(transporter)
    return this
  }

  /**
   * @param {Log} log
   * @return {HotLog}
   */
  commit(log) {
    this.#transporters.commit(log)
    return this
  }
}