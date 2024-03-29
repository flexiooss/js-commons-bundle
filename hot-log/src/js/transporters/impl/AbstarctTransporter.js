import {HotLogLevel} from "../../HotLogLevel.js";
import {hotLogTransporter} from "../HotLogTransporter.js";

/**
 * @abstract
 */
export class AbstractTransporter extends  hotLogTransporter(class  {
  
}){
  /**
   * @type {?HotLogLevel}
   */
  #threshold = null

  /**
   * @return {this}
   */
  levelTrace() {
    this.#threshold = HotLogLevel.TRACE
    return this
  }

  /**
   * @return {this}
   */
  levelDebug() {
    this.#threshold = HotLogLevel.DEBUG
    return this
  }

  /**
   * @return {this}
   */
  levelInfo() {
    this.#threshold = HotLogLevel.INFO
    return this
  }

  /**
   * @return {this}
   */
  levelWarn() {
    this.#threshold = HotLogLevel.WARN
    return this
  }

  /**
   * @return {this}
   */
  levelError() {
    this.#threshold = HotLogLevel.ERROR
    return this
  }

  /**
   * @return {this}
   */
  levelFatal() {
    this.#threshold = HotLogLevel.FATAL
    return this
  }

  /**
   * @return {?HotLogLevel}
   */
  threshold() {
    return this.#threshold
  }

}