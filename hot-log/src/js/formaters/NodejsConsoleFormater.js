import {hotLogFormater} from "./HotLogFormater.js";
import {isFunction} from "../../../../assert/index.js";

/**
 * @implements {HotLogFormater}
 */
export class NodejsConsoleFormater extends hotLogFormater(class {
}) {
  /**
   * @param {Log} log
   * @return {string}
   */
  format(log) {
    return `[${log.date().toString()}][${log.level().name()}][${log.emitter()}] :: ${isFunction(log.message())?log.message().call(null):log.message()}`
  }
}
