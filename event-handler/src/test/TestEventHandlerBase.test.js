/* global runTest */
import {EventHandlerBase} from '../js/EventHandlerBase'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {EventListenerConfigBuilder} from '../js/EventListenerConfigBuilder'


const assert = require('assert')


export class TestEventHandlerBase extends TestCase {

  /**
   * @type {boolean}
   */
  // debug = true

  setUp() {
    this.handler = new EventHandlerBase(10)
  }

  testHaveListener() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(1)
        })
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_1), 'Handler should have \'token_1\' listener')

    this.handler.removeEventListener(EVENT_1, token_1)

    assert(!this.handler.hasEventListener(EVENT_1, token_1), 'Handler should not have \'token_1\' listener')

  }

  testExecutionOrder() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(1)
        })
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_1), 'Handler should have \'token_1\' listener')

    const token_2 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(2)
        })
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_2), 'Handler should have \'token_2\' listener')

    this.handler.dispatch(EVENT_1)

    assert.deepStrictEqual([1, 2], result, 'Listeners should be executed ')

  }

  testRecursiveExecution() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .build()
    )

    const token_2 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          if (result.length < 2) {
            this.handler.dispatch(EVENT_1, 'b')
          }
          result.push(n + 2)
        })
        .build()
    )

    const token_3 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .build()
    )

    this.handler.dispatch(EVENT_1, 'a')

    assert.deepStrictEqual(['a1', 'b1', 'b2', 'b3', 'a2', 'a3'], result, 'Listeners should be executed in deep and recursivly')
  }

  testGuard() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .build()
    )

    const token_2 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 2)
        })
        .guard(payload => {
         return  payload !== 'a'
        })
        .build()
    )

    const token_3 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .build()
    )

    this.handler.dispatch(EVENT_1, 'a')
    this.log(result, 'guard result')
    assert.deepStrictEqual(['a1', 'a3'], result, 'Listeners should be guarded')
  }

  testMaxRecursiveExecution() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .build()
    )

    const token_2 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          this.handler.dispatch(EVENT_1, 'b')
          result.push(n + 2)
        })
        .build()
    )

    const token_3 = this.handler.addEventListener(
      EventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .build()
    )

    assert.throws(() => {
        this.handler.dispatch(EVENT_1, 'a')
      },
      /^Error: MAX EXECUTION/,
      'should throw max exec'
    )

  }

}


runTest(TestEventHandlerBase)
