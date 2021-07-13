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

  async asyncTestSyncRequest() {
    return new Promise((resolve) => {
      this.#request('request_id')
        .then(_ => {
          assert.strictEqual(this.#cptRequest, 5)
          this.#request('request_id')
            .then(_ => {
              assert.strictEqual(this.#cptRequest, 1)
              this.#request('request_id')
                .then(_ => {
                  assert.strictEqual(this.#cptRequest, 1)
                  resolve()
                })
            })
        })
    })
  }

  async asyncTestAsyncRequest() {
    return new Promise((resolve) => {
      const promise1 = this.#request('request_id')
      const promise2 = this.#request('request_id')
      const promise3 = this.#request('request_id')

      Promise.all([promise1, promise2, promise3]).then((values) => {
        assert.strictEqual(this.#cptRequest, 1)
        resolve()
      })
    })
  }

  async asyncTestMultipleAsyncRequest() {
    return new Promise((resolve) => {
      const promise1 = this.#request('request_id')
      const promise2 = this.#request('request_id_2')
      const promise3 = this.#request('request_id')
      const promise4 = this.#request('request_id_2')
      const promise5 = this.#request('request_id_3')
      promise1.then(_ => {
        assert.strictEqual(this.#cptRequest, 1)
      })
      promise2.then(_ => {
        assert.strictEqual(this.#cptRequest, 2)
      })
      promise3.then(_ => {
        assert.strictEqual(this.#cptRequest, 2)
      })
      promise4.then(_ => {
        assert.strictEqual(this.#cptRequest, 2)
      })
      promise5.then(_ => {
        assert.strictEqual(this.#cptRequest, 3)
      })

      Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
        resolve()
      })
    })
  }
}

runTest(TestRequestDispatcherTest)
