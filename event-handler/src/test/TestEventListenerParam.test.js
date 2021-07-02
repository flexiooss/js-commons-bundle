/* global runTest */
import {EventListenerConfigBuilder} from '../js/EventListenerConfigBuilder'

import {TestCase} from '@flexio-oss/code-altimeter-js'

const assert = require('assert')

export class TestEventListenerParam extends TestCase {
  testEventHandlerBase() {
    const eventListenerBuilder = EventListenerConfigBuilder.listen('toto').callback(a=>a).build()
  }

}

runTest(TestEventListenerParam)
