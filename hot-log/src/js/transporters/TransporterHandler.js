import {HotLogTransporterList} from "./HotLogTransporterList";
import {Log} from "../Log";
import {assertInstanceOf} from '../../../../assert'

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
   * @return {TransporterHandler}
   */
  commit(log) {
    assertInstanceOf(log, Log, 'Log')
    this.#transporters.forEach(transporter => {
      transporter.commit(log)
    })
    return this
  }

}