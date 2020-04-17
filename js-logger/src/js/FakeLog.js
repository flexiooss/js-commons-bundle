import {Level} from './Level'

const logs = new Set()

/**
 * @implements {LogInterface}
 */
export class FakeLog {
  /**
   *
   * @return {LogInterface}
   */
  debug() {
    return this
  }

  /**
   * @return {LogInterface}
   */
  info() {
    return this
  }

  /**
   * @return {LogInterface}
   */
  warn() {
    return this
  }

  /**
   * @return {LogInterface}
   */
  error() {
    return this
  }

  /**
   *
   * @param {(String|Object)} log
   * @return {LogInterface}
   */
  pushLog(log) {
    return this
  }

  /**
   * @return {Set<(String|Object)>}
   */
  logs() {
    return logs
  }

  /**
   *
   * @return {Level}
   */
  level() {
    return Level.DEBUG
  }
}
