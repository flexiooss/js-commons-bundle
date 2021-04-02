import {isString, isNull, isNumber, assertType} from './__import__assert'
import {COLORS} from './colors'
import {LogBuilder} from './LogBuilder'
import {Level} from './Level'
import {LoggerInterface} from './LoggerInterface'

const FONT_SIZE = 12

/**
 * @implements {LoggerInterface}
 */
export class ConsoleLogger extends LoggerInterface {
  constructor() {
    super()
    this._level = Level.INFO
  }

  /**
   *
   * @return {LoggerInterface}
   */
  debug() {
    this._level = Level.DEBUG
    return this
  }

  /**
   *
   * @return {LoggerInterface}
   */
  info() {
    this._level = Level.INFO
    return this
  }

  /**
   *
   * @return {LoggerInterface}
   */
  warn() {
    this._level = Level.WARN
    return this
  }

  /**
   *
   * @return {LoggerInterface}
   */
  error() {
    this._level = Level.ERROR
    return this
  }

  /**
   *
   * @param {LogInterface} log
   * @param {Object} [options={}]
   */
  log(log, options = {}) {
    if (this._isLoggable(log)) {

      /**
       * @type {ConsoleLogOptions}
       */
      const consoleOptions = ConsoleOptionsBuilder
        .fromObject(options)
        .build()

      if (log.logs().size > 1) {
        let i = 0
        let collapsed = false
        log.logs().forEach((v) => {
          if (isString(v) && i === 0) {
            console.groupCollapsed('%c ' + v, this._styleLine(log, consoleOptions, true))
            collapsed = true
          } else if (isString(v)) {
            this.#write(v, log, this._styleLine(log, consoleOptions))
          } else {
            console.dir(v, this._styleLine(log, consoleOptions))
          }
          i++
        })

        if (collapsed) {
          console.groupEnd()
        }
      } else {
        log.logs().forEach((v) => {
          if (isString(v)) {
            this.#write(v, log, this._styleLine(log, consoleOptions, true))
          } else {
            console.dir(v, this._styleLine(log, consoleOptions))
          }
        })
      }
    }
  }

  /**
   * @param {string} msg
   * @param {LogInterface} log
   * @param {string}  style
   */
  #write(msg, log, style) {
    if (log.level() === Level.ERROR) {
      console.error('%c ' + msg, style)
    } else if (log.level() === Level.WARN) {
      console.warn('%c ' + msg, style)
    } else if (log.level() === Level.INFO) {
      console.info('%c ' + msg, style)
    } else {
      console.debug('%c ' + msg, style)
    }
  }

  /**
   *
   * @param {LogInterface} log
   * @param {ConsoleLogOptions} options
   * @param {boolean} [isTitle=false]
   * @return {string}
   * @protected
   */
  _styleLine(log, options, isTitle = false) {
    let styles = ''
    if (isTitle) {
      styles += 'background-color: ' + this._resolveColor(log, options) + '; color: #fff;' + 'font-size: ' + ((options.titleSize() * 1.5) + FONT_SIZE) + 'px;'
      return styles
    }
    styles += 'color: ' + this._resolveColor(log, options) + ';'
    return styles
  }

  /**
   *
   * @param {LogInterface} log
   * @param {ConsoleLogOptions} options
   * @return {string}
   * @protected
   */
  _resolveColor(log, options) {
    if (log.level() === Level.ERROR) {
      return COLORS.error
    }
    if (log.level() === Level.WARN) {
      return COLORS.warn
    }
    if (!isNull(options.color()) && options.color().startsWith('#')) {
      return options.color()
    }
    return COLORS[options.color()] || COLORS.black
  }

  /**
   *
   * @param {LogInterface} log
   * @return {boolean}
   * @protected
   */
  _isLoggable(log) {
    if (this._level === Level.DEBUG) {
      return true
    }
    if (this._level === Level.INFO && log.level() !== Level.DEBUG) {
      return true
    }
    if (this._level === Level.WARN && log.level() !== Level.DEBUG && log.level() !== Level.INFO) {
      return true
    }
    if (this._level === Level.ERROR && log.level() === Level.ERROR) {
      return true
    }
    return false
  }

  /**
   *
   * @return {LogBuilder}
   */
  builder() {
    return new LogBuilder()
  }

}

class ConsoleLogOptions {
  /**
   *
   * @param {string} color
   * @param {number} titleSize
   */
  constructor(color, titleSize) {
    this._color = color
    this._titleSize = titleSize
  }

  /**
   *
   * @return {string}
   */
  color() {
    return this._color
  }

  /**
   *
   * @return {number}
   */
  titleSize() {

    return this._titleSize
  }
}

class ConsoleOptionsBuilder {
  constructor() {
    this._color = null
    this._titleSize = null
  }

  /**
   *
   * @param {string} color
   * @return {ConsoleOptionsBuilder}
   */
  color(color) {
    assertType(isString(color), 'ConsoleOptionsBuilder:color: `color` should be a string')
    this._color = color
    return this
  }

  /**
   *
   * @param {number} titleSize
   * @return {ConsoleOptionsBuilder}
   */
  titleSize(titleSize) {
    assertType(isNumber(titleSize), 'ConsoleOptionsBuilder:titleSize: `titleSize` should be a number')
    this._titleSize = titleSize
    return this
  }

  /**
   *
   * @param {Object} options
   * @return {ConsoleOptionsBuilder}
   */
  static fromObject(options) {
    const builder = new ConsoleOptionsBuilder()
    if (typeof options.color !== 'undefined') {
      builder.color(options.color)
    }
    if (typeof options.titleSize !== 'undefined') {
      builder.titleSize(options.titleSize)
    }

    return builder
  }

  /**
   *
   * @return {ConsoleLogOptions}
   */
  build() {
    return new ConsoleLogOptions(this._color, this._titleSize)
  }

}
