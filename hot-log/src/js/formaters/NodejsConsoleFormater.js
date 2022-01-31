import {hotLogFormater} from "./HotLogFormater";

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
    return `[${log.date().toString()}][${log.level().name()}][${log.emitter()}] :: ${log.message()}`
  }
}
