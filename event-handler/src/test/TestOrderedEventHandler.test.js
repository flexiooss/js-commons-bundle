/* global runTest */
import {OrderedEventHandler} from '../js/OrderedEventHandler.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {OrderedEventListenerConfigBuilder} from '../js/OrderedEventListenerConfigBuilder.js'


const assert = require('assert')


export class TestOrderedEventHandler extends TestCase {
  setUp() {
    /**
     *
     * @type {OrderedEventHandler}
     */
    this.handler = new OrderedEventHandler(10)
  }

  testHaveListener() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(1)
        })
        .priority(100)
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_1), 'Handler should have \'token_1\' listener')

    this.handler.removeEventListener(EVENT_1, token_1)

    assert(!this.handler.hasEventListener(EVENT_1, token_1), 'Handler should not have \'token_1\' listener')

  }

  testHaveListenerClbBuilder() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(builder=>builder
        .events(EVENT_1)
        .callback(() => {
          result.push(1)
        })
        .priority(100)
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
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(1)
        })
        .priority(55)
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_1), 'Handler should have \'token_1\' listener')

    const token_2 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback(() => {
          result.push(2)
        })
        .priority(50)
        .build()
    )

    assert(this.handler.hasEventListener(EVENT_1, token_2), 'Handler should have \'token_2\' listener')

    this.handler.dispatch(EVENT_1, null)

    assert.deepStrictEqual([2, 1], result, 'Listeners should be executed ')

  }

  testRecursiveExecution() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .build()
    )

    const token_2 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          if (result.length < 2) {
            this.handler.dispatch(EVENT_1, 'b')
          }
          result.push(n + 2)
        })
        .priority(60)
        .build()
    )

    const token_3 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .priority(50)
        .build()
    )

    this.handler.dispatch(EVENT_1, 'a')

    assert.deepStrictEqual(['a3', 'b3', 'b2', 'b1', 'a2', 'a1'], result, 'Listeners should be executed in deep and recursivly')

  }

  testMaxRecursiveExecution() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .build()
    )

    const token_2 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          this.handler.dispatch(EVENT_1, 'b')
          result.push(n + 2)
        })
        .priority(50)
        .build()
    )

    const token_3 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .priority(0)
        .build()
    )

    assert.throws(() => {
        this.handler.dispatch(EVENT_1, 'a')
      },
      /EventHandlerMaxExecutionException/,
      'should throw max exec'
    )

  }

  testGuard() {
    const EVENT_1 = 'EVENT_1'
    let result = []

    const token_1 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 1)
        })
        .priority(100)
        .build()
    )

    const token_2 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 2)
        })
        .guard(payload => {
          return  payload !== 'a'
        })
        .priority(50)
        .build()
    )

    const token_3 = this.handler.addEventListener(
      OrderedEventListenerConfigBuilder
        .listen(EVENT_1)
        .callback((n) => {
          result.push(n + 3)
        })
        .priority(400)
        .build()
    )

    this.handler.dispatch(EVENT_1, 'a')
    this.log(result, 'guard result')
    assert.deepStrictEqual(['a1', 'a3'], result, 'Listeners should be guarded')
  }

}


runTest(TestOrderedEventHandler)
