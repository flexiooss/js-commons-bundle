import {filter} from "./Filter.js";
import {Log} from "../../Log.js";
import {assertInstanceOf, isNull, TypeCheck} from "../../../../../assert/index.js";
import {HotLogLevel, HotLogLevelHelper} from "../../HotLogLevel.js";

/**
 * @implements {Filter}
 */
export class RangeFilter extends filter(class {
}) {
  /**
   * @type {?HotLogLevel}
   */
  #minLevel = null
  /**
   * @type {?HotLogLevel}
   */
  #maxLevel = null
  /**
   * @type {?RegExp}
   */
  #matchEmitter = null
  /**
   * @type {?RegExp}
   */
  #matchMessage = null
  /**
   * @type {?function(Log):boolean}
   */
  #matchLog = null

  /**
   * @param {?HotLogLevel} minLevel
   * @param {?HotLogLevel} maxLevel
   * @param {?RegExp} matchEmitter
   * @param {?RegExp} matchMessage
   * @param {?function(Log):boolean} matchLog
   */
  constructor(minLevel, maxLevel, matchEmitter, matchMessage, matchLog) {
    super()
    if (!isNull(minLevel)) {
      assertInstanceOf(minLevel, HotLogLevel, 'HotLogLevel')
    }
    if (!isNull(maxLevel)) {
      assertInstanceOf(maxLevel, HotLogLevel, 'HotLogLevel')
    }
    this.#minLevel = minLevel;
    this.#maxLevel = maxLevel;
    this.#matchEmitter = TypeCheck.assertIsRegExpOrNull(matchEmitter);
    this.#matchMessage = TypeCheck.assertIsRegExpOrNull(matchMessage);
    this.#matchLog = TypeCheck.assertIsArrowFunctionOrNull(matchLog);
  }

  /**
   * @param {Log} log
   * @return {boolean}
   */
  match(log) {
    assertInstanceOf(log, Log, 'Log')

    if (!isNull(this.#minLevel)) {
      if (HotLogLevelHelper.gt(this.#minLevel, log.level())) {
        return false
      }
    }
    if (!isNull(this.#maxLevel)) {
      if (HotLogLevelHelper.lt(this.#maxLevel, log.level())) {
        return false
      }
    }
    if (!isNull(this.#matchEmitter)) {
      if (!this.#matchEmitter.test(log.emitter())) {
        return false
      }
    }
    if (!isNull(this.#matchMessage)) {
      if (!this.#matchMessage.test(log.message())) {
        return false
      }
    }
    if (!isNull(this.#matchLog)) {
      if (this.#matchLog.call(null, log) !== true) {
        return false
      }
    }

    return true
  }
}

export class RangeFilterBuilder {
  /**
   * @type {?HotLogLevel}
   */
  #minLevel = null
  /**
   * @type {?HotLogLevel}
   */
  #maxLevel = null
  /**
   * @type {?RegExp}
   */
  #matchEmitter = null
  /**
   * @type {?RegExp}
   */
  #matchMessage = null
  /**
   * @type {?function(Log):boolean}
   */
  #matchLog = null

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelTrace() {
    this.#minLevel = HotLogLevel.TRACE
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelDebug() {
    this.#minLevel = HotLogLevel.DEBUG
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelInfo() {
    this.#minLevel = HotLogLevel.INFO
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelWarn() {
    this.#minLevel = HotLogLevel.WARN
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelError() {
    this.#minLevel = HotLogLevel.ERROR
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  minLevelFatal() {
    this.#minLevel = HotLogLevel.FATAL
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelTrace() {
    this.#maxLevel = HotLogLevel.TRACE
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelDebug() {
    this.#maxLevel = HotLogLevel.DEBUG
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelInfo() {
    this.#maxLevel = HotLogLevel.INFO
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelWarn() {
    this.#maxLevel = HotLogLevel.WARN
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelError() {
    this.#maxLevel = HotLogLevel.ERROR
    return this
  }

  /**
   * @return {RangeFilterBuilder}
   */
  maxLevelFatal() {
    this.#maxLevel = HotLogLevel.FATAL
    return this
  }

  /**
   * @param {?RegExp} value
   * @return {RangeFilterBuilder}
   */
  matchEmitter(value) {
    this.#matchEmitter = value;
    return this
  }

  /**
   * @param {?RegExp} value
   * @return {RangeFilterBuilder}
   */
  matchMessage(value) {
    this.#matchMessage = value;
    return this
  }

  /**
   * @param {?function(Log):boolean} value
   * @return {RangeFilterBuilder}
   */
  matchLog(value) {
    this.#matchLog = value;
    return this
  }

  build() {
    return new RangeFilter(this.#minLevel, this.#maxLevel, this.#matchEmitter, this.#matchMessage, this.#matchLog)
  }
}