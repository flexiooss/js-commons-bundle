import {Level} from './Level'

/**
 * @implements {LogInterface}
 */
export class LogBuilder {
  constructor() {
    /**
     *
     * @type {Level} [Level.DEBUG]
     * @private
     */
    this._level = Level.DEBUG
    this._logs = new Set()
  }

  /**
   *
   * @return {this}
   */
  debug() {
    this._level = Level.DEBUG
    return this
  }

  /**
   *
   * @return {this}
   */
  info() {
    this._level = Level.INFO
    return this
  }

  /**
   *
   * @return {this}
   */
  warn() {
    this._level = Level.WARN
    return this
  }

  /**
   *
   * @return {this}
   */
  error() {
    this._level = Level.ERROR
    return this
  }

  /**
   *
   * @param {(String|Object)} log
   * @return {this}
   */
  pushLog(log) {
    this._logs.add(log)
    return this
  }

  /**
   * @return {Set<level(String|Object)>}
   */
  logs() {
    return this._logs
  }

  /**
   *
   * @return {Level}
   */
  level() {
    return this._level
  }

}
