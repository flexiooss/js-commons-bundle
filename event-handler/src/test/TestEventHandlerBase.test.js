/* global runTest */
import {EventHandlerBase} from '../js/EventHandlerBase.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {EventListenerConfigBuilder} from '../js/EventListenerConfigBuilder.js'


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
          return payload !== 'a'
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

  async asyncTestPropagateExecutionId() {
    return new Promise((ok, ko) => {
      const EVENT_1 = 'EVENT_1'
      const EXPRECTED = 'EXPRECTED'

      const token_1 = this.handler.addEventListener(
        EventListenerConfigBuilder
          .listen(EVENT_1)
          .callback((payload, eventName, executionId) => {
            this.log(executionId, 'executionId')
            if (executionId === EXPRECTED) {
              ok()
            } else {
              ko()
            }
          })
          .build()
      )

      this.handler.dispatch(EVENT_1, 'a', EXPRECTED)

    })
  }

  async asyncTestOnce() {
    return new Promise((ok, ko) => {
      const EVENT_1 = 'EVENT_1'
      const EXPRECTED = 'EXPRECTED'
      const token_1 = this.handler.addEventListener(
        EventListenerConfigBuilder
          .listen(EVENT_1)
          .once()
          .callback((payload, eventName, executionId) => {
            if (this.handler.hasEventListener(EVENT_1, token_1)) {
              ko('listener should be deletd after dispatch')
            } else {
              ok()
            }
          })
          .build()
      )
      assert.ok(this.handler.hasEventListener(EVENT_1, token_1), 'should have listner before dispatch')

      this.handler.dispatch(EVENT_1, 'a')
    })
  }

  async asyncTestOnceWithGuard() {
    return new Promise((ok, ko) => {
      const EVENT_1 = 'EVENT_1'
      const NOT_EXPRECTED = 'NOT_EXPRECTED'
      const EXPRECTED = 'EXPRECTED'
      const token_1 = this.handler.addEventListener(
        EventListenerConfigBuilder
          .listen(EVENT_1)
          .once()
          .callback((payload, eventName, executionId) => {
            if (EXPRECTED !== executionId) {
              ko('should be blocked by guard')
            }
            if (this.handler.hasEventListener(EVENT_1, token_1)) {
              ko('listener should be deletd after dispatch')
            } else {
              ok()
            }
          })
          .guard(v => v === 'b')
          .build()
      )
      assert.ok(this.handler.hasEventListener(EVENT_1, token_1), 'should have listner before dispatch')

      this.handler.dispatch(EVENT_1, 'a', NOT_EXPRECTED)
      assert.ok(this.handler.hasEventListener(EVENT_1, token_1), 'should always have listner after dispatch blocked by guard')
      this.handler.dispatch(EVENT_1, 'b', EXPRECTED)
    })
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
