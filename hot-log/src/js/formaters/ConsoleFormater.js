import {hotLogFormater} from "./HotLogFormater";

export class ConsoleFormater extends hotLogFormater(class {
}) {
  /**
   * @param {Log} log
   * @return {string}
   */
  format(log) {
    return `[${log.emitter()}] :: ${log.message()}`
  }
}
