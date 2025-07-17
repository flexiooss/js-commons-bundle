import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ConsoleLogger} from '../js/ConsoleLogger'

const assert = require('assert')

export class TestLogger extends TestCase {

  testLogHandler() {
    const logHandler = new ConsoleLogger()
  }

}

runTest(TestLogger)
