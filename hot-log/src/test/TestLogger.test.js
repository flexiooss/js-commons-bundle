import {TestCase} from '@flexio-oss/code-altimeter-js'
import {HotLog} from "../js/HotLog";
import {ConsoleTransporterBuilder} from "../js/transporters/impl/ConsoleTransporter";
import {Logger} from "../js/Logger";
import {FilterList} from "../js/transporters/filters/FilterList";
import {RangeFilterBuilder} from "../js/transporters/filters/RangeFilter";
import {TestTransporter} from "./TestTransporter";

const assert = require('assert')

export class TestLogger extends TestCase {

  testHotLogWithoutTransporters() {
    /**
     * @type {HotLog}
     */
    const hotLog = HotLog.getHotLog()

    /**
     * @type {Logger}
     */
    const defaultLogger = Logger.getLogger('default')

    /**
     * @type {Logger}
     */
    const specificLogger = Logger.getLogger(this.constructor.name, 'specific', '42')

    defaultLogger.fatal('should not work')
    defaultLogger.error('should not work')
    defaultLogger.warn('should not work')
    defaultLogger.info('should not work')
    defaultLogger.debug('should not work')
    defaultLogger.trace('should not work')

    specificLogger.trace('should not work')
    specificLogger.debug('should not work')
    specificLogger.info('should not  work')
    specificLogger.warn('should not work')
    specificLogger.error('should not work')
    specificLogger.fatal('should not work')
  }

  testHotLog() {

    /**
     * @type {HotLog}
     */
    const hotLog = HotLog.getHotLog()
      .addTransporter(ConsoleTransporterBuilder.getWithNodejsConsoleFormater().build())
      .disableSilentMode()

    /**
     * @type {Logger}
     */
    const defaultLogger = Logger.getLogger('default')

    /**
     * @type {Logger}
     */
    const specificLogger = Logger.getLogger(this.constructor.name, 'specific', '42')

    defaultLogger.fatal('defaultLogger fatal should work', this)
    defaultLogger.error('defaultLogger error should work')
    defaultLogger.warn('defaultLogger warn should work')
    defaultLogger.info('defaultLogger info should work')
    defaultLogger.debug('defaultLogger debug should not work')
    defaultLogger.trace('defaultLogger trace should not work')

    specificLogger.trace('specificLogger trace should work')
    specificLogger.debug('specificLogger debug should work')
    specificLogger.info('specificLogger info should work')
    specificLogger.warn('specificLogger warn should work')
    specificLogger.error('specificLogger error should work')
    specificLogger.fatal('specificLogger fatal should work')
  }

  testHotLogAsync() {

    /**
     * @type {HotLog}
     */
    const hotLog = HotLog.getHotLog()
      .asynchronous()
      .addTransporter(ConsoleTransporterBuilder.getWithNodejsConsoleFormater().build())
      .disableSilentMode()

    /**
     * @type {Logger}
     */
    const defaultLogger = Logger.getLogger('default')

    /**
     * @type {Logger}
     */
    const specificLogger = Logger.getLogger(this.constructor.name, 'specific', '42')

    defaultLogger.fatal('defaultLogger fatal should work', this)
    defaultLogger.error('defaultLogger error should work')
    defaultLogger.warn('defaultLogger warn should work')
    defaultLogger.info('defaultLogger info should work')
    defaultLogger.debug('defaultLogger debug should not work')
    defaultLogger.trace('defaultLogger trace should not work')

    specificLogger.trace('specificLogger trace should work')
    specificLogger.debug('specificLogger debug should work')
    specificLogger.info('specificLogger info should work')
    specificLogger.warn('specificLogger warn should work')
    specificLogger.error('specificLogger error should work')
    specificLogger.fatal('specificLogger fatal should work')
  }

  testHotLogWithFilters() {
    /**
     * @type {HotLog}
     */
    const hotLog = HotLog.getHotLog()
      .addTransporter(ConsoleTransporterBuilder.getWithConsoleFormater()
        .build())
      .disableSilentMode()

    /**
     * @type {Logger}
     */
    const defaultLogger = Logger.getLogger('default')

    /**
     * @type {Logger}
     */
    const specificLogger = Logger.getLogger(this.constructor.name, 'specific', '42')
      .addTransporter(
        ConsoleTransporterBuilder
          .getWithNodejsConsoleFormater()
          .filters(new FilterList(
            new RangeFilterBuilder()
              .matchEmitter(new RegExp('AbstractKeycloakApplication'))
              .build()
          ))
          .build()
      )

    defaultLogger.fatal('defaultLogger fatal defaultLogger fatal should work', this)
    defaultLogger.error('defaultLogger error defaultLogger error should work', {})
    defaultLogger.error('defaultLogger error defaultLogger error should work')
    defaultLogger.warn('defaultLogger warn defaultLogger warn should work')
    defaultLogger.info('defaultLogger info defaultLogger info should work', () => {
      return {}
    })

    defaultLogger.debug('defaultLogger debug defaultLogger debug should not work', {})
    defaultLogger.trace('defaultLogger trace defaultLogger trace should not work')

    specificLogger.trace('specificLogger trace should work')
    specificLogger.debug('specificLogger debug should work')
    specificLogger.info('specificLogger info should work')
    specificLogger.warn('specificLogger warn should work')
    specificLogger.error('specificLogger error should work')
    specificLogger.fatal('specificLogger fatal should not work')
  }

  async asyncTestLevelPredominance1() {
    return new Promise((ok, ko) => {

      /**
       * @type {HotLog}
       */
      const hotLog = HotLog.getHotLog()
        .addTransporter(new TestTransporter((pass, log) => {
          if (pass) {
            ko(new Error('should not pass'))
          } else {
            ok()
          }
        }, null))
        .levelError()
        .disableSilentMode()

      /**
       * @type {Logger}
       */
      const defaultLogger = Logger.getLogger('default')

      defaultLogger.debug(('coucou'))
    })

  }

  async asyncTestLevelPredominance2() {
    return new Promise((ok, ko) => {

      /**
       * @type {HotLog}
       */
      const hotLog = HotLog.getHotLog()
        .addTransporter(new TestTransporter((pass, log) => {
          if (!pass) {
            ko(new Error('should  pass'))
          } else {
            ok()
          }
        }, null))
        .levelError()
        .disableSilentMode()

      /**
       * @type {Logger}
       */
      const defaultLogger = Logger.getLogger('default').levelDebug()

      defaultLogger.debug(('coucou'))
    })

  }

  async asyncTestLevelPredominance3() {

    return new Promise((ok, ko) => {

      /**
       * @type {HotLog}
       */
      const hotLog = HotLog.getHotLog()
        .addTransporter(new TestTransporter((pass, log) => {
          if (pass) {
            ko(new Error('should not pass'))
          } else {
            ok()
          }
        }, null).levelInfo())
        .levelError()
        .disableSilentMode()

      /**
       * @type {Logger}
       */
      const defaultLogger = Logger.getLogger('default').levelDebug()

      defaultLogger.debug(('coucou'))
    })

  }

}

runTest(TestLogger)
