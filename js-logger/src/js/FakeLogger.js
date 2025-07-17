import {FakeLog} from './FakeLog'
import {LoggerInterface} from './LoggerInterface'

const fakeLog = new FakeLog()

/**
 * @implements {LoggerInterface}
 */
export class FakeLogger extends LoggerInterface{
  /**
   *
   * @return {LoggerInterface}
   */
  debug() {
    return this
  }

  /**
   * @return {LoggerInterface}
   */
  info() {
    return this
  }

  /**
   * @return {LoggerInterface}
   */
  warn() {
    return this
  }

  /**
   * @return {LoggerInterface}
   */
  error() {
    return this
  }

  /**
   *
   * @param {LogInterface} log
   * @param {Object} options
   */
  log(log, options) {
  }

  /**
   * @return {LogInterface}
   */
  builder() {
    return fakeLog
  }
}
