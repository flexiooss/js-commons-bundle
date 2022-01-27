import {hotLogFormater} from "./HotLogFormater";

export class NodejsConsoleFormater extends hotLogFormater(class {
}) {
  /**
   * @param {Log} log
   * @return {string}
   */
  format(log) {
    return `[${log.date().toISOString()}][${log.level().name()}][${log.emitter()}] :: ${log.message()}`
  }
}
