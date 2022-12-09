import {hotLogFormater} from "./HotLogFormater";
import {isFunction} from "../../../../assert";

/**
 * @implements {HotLogFormater}
 */
export class ConsoleFormater extends hotLogFormater(class {
}) {
  /**
   * @param {Log} log
   * @return {string}
   */
  format(log) {
    return `[${log.emitter()}] :: ${isFunction(log.message())?log.message().call(null):log.message()}`
  }
}
