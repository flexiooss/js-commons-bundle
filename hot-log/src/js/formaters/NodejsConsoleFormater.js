import {hotLogFormater} from "./HotLogFormater";
import {isFunction} from "../../../../assert";

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
