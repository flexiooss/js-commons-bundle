/* global runTest */
import {EventListenerConfigBuilder} from '../js/EventListenerConfigBuilder'
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

export class TestEventListenerBuilder extends TestCase {
  testEventHandlerBase() {
    const eventListenerBuilder = EventListenerConfigBuilder.listen('toto')
  }

}

runTest(TestEventListenerBuilder)
