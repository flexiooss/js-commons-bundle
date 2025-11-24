import {TypeCheck} from "../../../assert/index.js";

export class Mutex {
  /**
   * @type {boolean}
   */
  #locked = false;
  /**
   * @type {Array<function():Promise<*>>}
   */
  #queue = [];

  /**
   * @return {Promise<*>}
   */
  async #lock() {
    if (this.#locked) {
      return new Promise(resolve => {
        this.#queue.push(resolve);
      });
    }

    this.#locked = true;
  }


  unlock() {
    if (this.#queue.length > 0) {
      const resolve = this.#queue.shift();
      resolve();
    } else {
      this.#locked = false;
    }
  }

  /**
   * @param {function():Promise<*>} callback
   * @return {Promise<*>}
   */
  async runExclusiveAndUnlock(callback) {
    TypeCheck.assertIsFunction(callback);
    await this.#lock();
    try {
      return await callback();
    } finally {
      this.unlock();
    }
  }

  /**
   * @param {function():Promise<*>} callback
   * @return {Promise<*>}
   */
  async runExclusive(callback) {
    TypeCheck.assertIsFunction(callback);
    await this.#lock();
    return await callback();
  }
}