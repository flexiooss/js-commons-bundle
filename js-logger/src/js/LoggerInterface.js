/**
 * @interface
 */
export class LoggerInterface {
  /**
   *
   * @return {LoggerInterface}
   */
  debug() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LoggerInterface}
   */
  info() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LoggerInterface}
   */
  warn() {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LoggerInterface}
   */
  error() {
    throw new Error('Not implemented yet')
  }
  /**
   *
   * @param {LogInterface} log
   * @param {Object} [options={}]
   */
  log(log, options={}) {
    throw new Error('Not implemented yet')
  }

  /**
   * @return {LogInterface}
   */
  builder(){
    throw new Error('Not implemented yet')

  }
}
