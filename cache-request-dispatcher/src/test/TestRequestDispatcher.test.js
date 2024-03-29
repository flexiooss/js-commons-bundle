import {TestCase} from '@flexio-oss/code-altimeter-js'
import {CacheRequestDispatcher} from '../js/CacheRequestDispatcher.js'

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

  async #request(request_id, value = null) {
    return this.#cache.get(
      request_id,
      async () => {
        this.#cptRequest++
        return value
      }
    )
  }

  async asyncTestSyncRequest() {
    return new Promise((resolve, reject) => {
      this.#request('request_id', 'toto')
        .then(_ => {
          if (this.#cptRequest !== 1) {
            reject.call(null)
          }
          this.#request('request_id', 'toto')
            .then(_ => {
              if (this.#cptRequest !== 1) {
                reject.call(null)
              }
              this.#request('request_id', 'toto')
                .then(_ => {
                  if (this.#cptRequest !== 1) {
                    reject.call(null)
                  }
                  resolve()
                })
            })
        })
    })
  }

  async asyncTestAsyncRequest() {
    return new Promise((resolve, reject) => {
      const promise1 = this.#request('request_id', 'toto')
      const promise2 = this.#request('request_id', 'toto')
      const promise3 = this.#request('request_id', 'toto')

      Promise.all([promise1, promise2, promise3]).then((values) => {
        if (this.#cptRequest !== 1) {
          reject()
        }
        resolve()
      })
    })
  }

  async asyncTestMultipleAsyncRequest() {
    return new Promise(async (resolve, reject) => {
      const promise1 = await this.#request('request_id', 'toto')
      if (this.#cptRequest !== 1) {
        reject()
      }
      const promise2 = await this.#request('request_id_2', 'toto')
      if (this.#cptRequest !== 2) {
        reject()
      }
      const promise3 = await this.#request('request_id', 'toto')
      if (this.#cptRequest !== 2) {
        reject()
      }
      const promise4 = await this.#request('request_id_2', 'toto')
      if (this.#cptRequest !== 2) {
        reject()
      }
      const promise5 = await this.#request('request_id_3', 'toto')
      if (this.#cptRequest !== 3) {
        reject()
      }

      resolve()
    })
  }
}

runTest(TestRequestDispatcherTest)
