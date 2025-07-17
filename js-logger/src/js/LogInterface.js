/**
 * @interface
 */
export class LogInterface {
  /**
   *
   * @return {LogInterface}
   */
  debug() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LogInterface}
   */
  info() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LogInterface}
   */
  warn() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LogInterface}
   */
  error() {
    throw new Error('Not implemented yet')
  }

  /**
   *
   * @param {(String|Object)} log
   * @return {LogInterface}
   */
  pushLog(log) {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {Set<(String|Object)>}
   */
  logs() {
    throw new Error('Not implemented yet')
  }

  /**
   *
   * @return {Level}
   */
  level() {
    throw new Error('Not implemented yet')
  }
}
