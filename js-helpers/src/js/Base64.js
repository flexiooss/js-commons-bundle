import {BaseException} from '../../../js-type-helpers/index.js'
import {isString} from "../../../assert/index.js";

export class Base64 {
  /**
   * @param {string }str
   * @return {boolean}
   */
  static #isWellFormed(str) {
    
    if (typeof (str.isWellFormed) != "undefined") {
      return str.isWellFormed();
    } else {
      try {
        encodeURIComponent(str);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  static #base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
  }

  static #bytesToBase64(bytes) {
    const CHUNK_SIZE = 100000; // arbitrary number according maximum arguments for function to avoid "maximum call stack error"
    let index = 0;
    const length = bytes.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = bytes.slice(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCodePoint(...slice);
      index += CHUNK_SIZE;
    }

    return btoa(result);
  }


  /**
   * @param {string} input
   * @return {string}
   * @throws {Base64EncoderException}
   */
  static encode(input) {
    if(!isString(input)) throw Base64EncoderException.BAD_INPUT();
    if (typeof globalThis.btoa === 'undefined') return globalThis.Buffer.from(input).toString('base64')
    if (Base64.#isWellFormed(input)) {
      return Base64.#bytesToBase64(new TextEncoder().encode(input))
    }
    throw Base64EncoderException.ENCODE_ERROR(input)
  }

  /**
   * @param {string} input
   * @return {string}
   * @throws {Base64EncoderException}
   */
  static decode(input) {
    if(!isString(input)) throw Base64EncoderException.BAD_INPUT();
    if (typeof globalThis.atob === 'undefined') return globalThis.Buffer.from(input, 'base64').toString()
    if (Base64.#isWellFormed(input)) {
      return new TextDecoder().decode(Base64.#base64ToBytes(input));
    }
    throw Base64EncoderException.DECODE_ERROR(input)
  }

}

export class Base64EncoderException extends BaseException {
  /**
   * @param {string} input
   * @return {Base64EncoderException}
   * @constructor
   */
  static DECODE_ERROR(input) {
    return new Base64EncoderException('can not decode: ' + input)
  }

  /**
   * @param {string} input
   * @return {Base64EncoderException}
   * @constructor
   */
  static ENCODE_ERROR(input) {
    return new Base64EncoderException('can not encode: ' + input)
  }

  /**
   * @return {Base64EncoderException}
   * @constructor
   */
  static BAD_INPUT() {
    return new Base64EncoderException('input should be string')
  }

  realName() {
    return 'Base64EncoderException'
  }
}