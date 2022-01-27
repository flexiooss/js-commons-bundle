import {TestCase} from '@flexio-oss/code-altimeter-js'
import {HotLog} from "../js/HotLog";
import {ConsoleTransporter} from "../js/transporters/ConsoleTransporter";
import {Logger} from "../js/Logger";
import {HotLogLevel} from "../js/HotLogLevel";
import {NodejsConsoleFormater} from "../js/formaters/NodejsConsoleFormater";

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
    const specificLogger = Logger.getLogger('withTrace', this, '42')


    defaultLogger.fatal('should not work')
    defaultLogger.error('should not work')
    defaultLogger.warn('should not work')
    defaultLogger.info('should not work')
    defaultLogger.debug('should not work')
    defaultLogger.trace('should not work')

    specificLogger.trace('should not work')
    specificLogger.debug('should not work')
    specificLogger.info('shouldnot  work')
    specificLogger.warn('should not work')
    specificLogger.error('should not work')
    specificLogger.fatal('should not work')
  }

  testHotLog() {
    /**
     * @type {HotLog}
     */
    const hotLog = HotLog.getHotLog().addTransporter(
      new ConsoleTransporter(new NodejsConsoleFormater())
    )

    /**
     * @type {Logger}
     */
    const defaultLogger = Logger.getLogger('default')

    /**
     * @type {Logger}
     */
    const specificLogger = Logger.getLogger('withTrace', this, '42').addTransporter(new ConsoleTransporter(new NodejsConsoleFormater(), HotLogLevel.TRACE))


    defaultLogger.fatal('should work')
    defaultLogger.error('should work')
    defaultLogger.warn('should work')
    defaultLogger.info('should work')
    defaultLogger.debug('should not work')
    defaultLogger.trace('should not work')

    specificLogger.trace('should work')
    specificLogger.debug('should work')
    specificLogger.info('should work')
    specificLogger.warn('should work')
    specificLogger.error('should work')
    specificLogger.fatal('should work')
  }

}

runTest(TestLogger)
