import {TestCase} from '@flexio-oss/code-altimeter-js'
import {CacheRequestDispatcher} from '../js/cache-request-dispatcher/CacheRequestDispatcher'

const assert = require('assert')

export class TestRequestDispatcherTest extends TestCase {
  #cptRequest
  /**
   * @type {CacheRequestDispatcher}
   */
  #cache

  setUp() {
    this.#cptRequest = 0

    this.#cache = new CacheRequestDispatcher()
  }

  async #request(request_id) {
    return this.#cache.get(request_id, () => {
      this.#cptRequest++
    })
  }

  testSyncRequest() {
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 1)
        this.#request('request_id')
          .then(_ => {
            assert.strictEqual(this.__cptRequeteSchema, 1)
            this.#request('request_id')
              .then(_ => {
                assert.strictEqual(this.__cptRequeteSchema, 1)
              })
          })
      })
  }

  testAsyncRequest() {
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 1)
      })
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 1)
      })
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 1)
      })
  }

  testMultipleAsyncRequest() {
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 1)
      })
    this.#request('request_id_2')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 2)
      })
    this.#request('request_id')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 2)
      })
    this.#request('request_id_2')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 2)
      })
    this.#request('request_id_3')
      .then(_ => {
        assert.strictEqual(this.__cptRequeteSchema, 3)
      })
  }
}

runTest(TestRequestDispatcherTest)
