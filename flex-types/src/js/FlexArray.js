import {  isUndefined, TypeCheck, isNull} from './__import__assert'
import {globalFlexioImport} from './__import__global-import-registry'
import {IndexError} from './IndexError'
import {deepFreezeSeal} from './__import__js-generator-helpers'


/**
 * @template TYPE
 * @extends Array<TYPE>
 */
export class FlexArray extends Array {
  /**
   * @type {boolean}
   */
  #frozen = false

  /**
   *
   * @param {...<TYPE>} args
   */
  constructor(...args) {
    super()
    for (const v of args) {
      this.push(v)
    }
  }

  /**
   *
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    throw new TypeError('Should be implemented')
  }

  /**
   *
   * @return {FlexArray<TYPE>}
   */
  freeze() {
    if(this.isFrozen()){
      return this
    }
    deepFreezeSeal(this)
    this.#frozen = true
    return this
  }

  /**
   * @return {boolean}
   */
  isFrozen(){
    return this.#frozen
  }

  /**
   *
   * @param {...TYPE} v
   * @returns {number}
   */
  push(...v) {
    v.forEach(a => this._validate(a))
    return super.push(...v)
  }

  /**
   *
   * @param {...TYPE} v
   * @returns {number}
   */
  unshift(...v) {
    v.forEach(a => this._validate(a))
    return super.unshift(...v)
  }

  /**
   *
   * @param {TYPE} v
   * @param {number} i
   * @param {number} o
   * @return {Array<TYPE>}
   */
  fill(v, i, o) {
    this._validate(v)
    return super.fill(v, i, o)
  }

  /**
   *
   * @param {number} offset
   * @return {TYPE}
   * @throws {IndexError}
   */
  get(offset) {
    const ret = this[offset]
    if (isUndefined(ret)) {
      throw globalFlexioImport.io.flexio.flex_types.IndexError.BAD_ARRAY_KEY(offset)
    }
    return ret
  }

  /**
   *
   * @param {number} offset
   * @param {TYPE} [defaultValue=null]
   * @return {TYPE}
   * @throws {IndexError}
   */
  getOr(offset, defaultValue = null) {
    const ret = this[offset]
    if (isUndefined(ret)) {
      return defaultValue
    }
    return ret
  }

  /**
   *
   * @param {number} offset
   * @return {boolean}
   */
  has(offset) {
    return offset < this.length
  }

  /**
   *
   * @param {number} offset
   * @param {TYPE} value
   * @return {FlexArray.<TYPE>}
   */
  set(offset, value) {
    if (offset > this.length) {
      throw  IndexError.BAD_ARRAY_KEY_GT_LENGTH(offset)
    }
    this._validate(value)
    this[offset] = value
    return this
  }

  /**
   *
   * @return {TYPE}
   */
  first() {
    return this.get(0)
  }

  /**
   *
   * @return {TYPE}
   */
  last() {
    return this[this.length - 1]
  }

  /**
   *
   * @param {function(current: TYPE, index: number, all: this):boolean} callback
   * @return {TYPE}
   */
  find(callback) {
    return super.find(callback)
  }

  /**
   *
   * @param {function(value: TYPE, index: number, array: this)} callback
   */
  forEach(callback) {
    return super.forEach(callback)
  }

  /**
   *
   * @param {number} [start=0]
   * @param {?number} [end=null]
   * @return {FlexArray.<TYPE>}
   */
  slice(start = 0, end = null) {
    end = (isNull(end))
      ? this.length
      : ((end < 0) ? (this.length + end) : end)

    if (end < start) {
      throw new Error('end should not be less than start')
    }

    const ret = new this.constructor()

    for (let i = start; i < end; ++i) {
      ret.push(this.get(i))
    }
    if(this.#frozen){
      ret.freeze()
    }
    return ret
  }

  /**
   * @param {number} start
   * @param {number} deleteCount
   * @param {...TYPE} args
   * @return {FlexArray.<TYPE>}
   */
  splice(start, deleteCount, ...args) {
    const a = this.toArray()
    a.splice(start, deleteCount, ...args)
    let ret = new this.constructor(...a)
    if(this.#frozen){
      ret.freeze()
    }
    return ret
  }

  /**
   *
   * @param {function(current: TYPE, index: number, all: this):boolean} callback
   * @param thisArg
   * @return {FlexArray<TYPE>}
   */
  filter(callback, thisArg) {
    TypeCheck.assertIsFunction(callback)

    let len = this.length >>> 0
    const res = new this.constructor()
    let t = this
    let c = 0
    let i = -1

    if (isUndefined(thisArg)) {
      while (++i !== len) {
        if (i in this) {
          if (callback(t[i], i, t)) {
            res.push(t[i])
          }
        }
      }
    } else {
      while (++i !== len) {
        if (i in this) {
          if (callback.call(thisArg, t[i], i, t)) {
            res.push(t[i])
          }
        }
      }
    }

    if(this.#frozen){
      res.freeze()
    }

    return res
  }

  /**
   * @param {function(final: *,current: TYPE, index: number, all: this):*} callback
   * @param initialValue
   * @return {*[]}
   */
  reduce(callback, initialValue) {
    return this.toArray().reduce(callback, initialValue)
  }

  /**
   * @param {function(final: *,current: TYPE, index: number, all: this):*} callback
   * @param initialValue
   * @return {*[]}
   */
  reduceRight(callback, initialValue) {
    return this.toArray().reduceRight(callback, initialValue)
  }

  /**
   * @template TYPE, TYPE_OUT
   * @param {Array<TYPE_OUT>} init
   * @param {function(value: TYPE, index: number, all: this):*} clb
   * @return {Array<TYPE_OUT>}
   */
  mapTo(init, clb) {
    this.forEach((v, k, a) => {
      init.push(clb(v, k, a))
    })
    return init
  }

  /**
   * @param {function(value: TYPE, index: number, all: this):*} clb
   * @return {Array}
   */
  mapToArray(clb) {
    return this.mapTo([], clb)
  }

  /**
   * @return {Array.<TYPE>}
   */
  toArray() {
    return this.mapToArray(v => v)
  }

  /**
   * @return {Array.<TYPE>}
   */
  toObject() {
    return this.toArray()
  }

  /**
   * @return {Array.<TYPE>}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   * @param {number} index
   * @param {TYPE} value
   * @return {Array<TYPE>}
   */
  with(index, value) {

    const ret = new this.constructor(...this)
    ret.set(index, value)
    if(this.#frozen){
      ret.freeze()
    }
    return ret
  }

  /**
   * @param {...TYPE} v
   * @return {Array<TYPE>}
   */
  withPush(...v) {
    const ret = new this.constructor(...this)
    ret.push(...v)
    if(this.#frozen){
      ret.freeze()
    }
    return ret
  }

  /**
   * @return {Array<TYPE>}
   */
  withPop() {
    const ret = new this.constructor(...this)
    ret.pop()
    if (this.#frozen) {
      ret.freeze()
    }
    return ret
  }

  /**
   * @return {Array<TYPE>}
   */
  withShift() {
    const ret = new this.constructor(...this)
    ret.shift()
    if (this.#frozen) {
      ret.freeze()
    }
    return ret
  }

  /**
   * @param {TYPE} to
   * @return  {boolean}
   */
  equals(to) {
    throw new Error('should be override')
  }

  /**
   *
   * @return {FlexArrayBuilder<TYPE, FlexArray.<TYPE>>}
   */
  static builder() {
    return new FlexArrayBuilder(this)
  }

  /**
   * @return {FlexArrayBuilder<TYPE, FlexArray.<TYPE>>}
   */
  static from(instance) {
    return FlexArrayBuilder.from(this, this)
  }

  /**
   * @return {FlexArrayBuilder<TYPE, FlexArray.<TYPE>>}
   */
  static fromObject(jsonObject) {
    return FlexArrayBuilder.fromObject(this, jsonObject)
  }

  /**
   * @return {FlexArrayBuilder<TYPE, FlexArray.<TYPE>>}
   */
  static fromJson(json) {
    return FlexArrayBuilder.fromJson(this, json)
  }
}


/**
 * @template TYPE, ARRAY_TYPE
 */
class FlexArrayBuilder {
  /**
   * @type {?Class.<ARRAY_TYPE>}
   */
  #arrayConstructor = null
  /**
   * @type {TYPE[]}
   */
  #values = []

  constructor(constructor) {

    this.#arrayConstructor = TypeCheck.assertIsClass(constructor)
  }

  /**
   * @type {TYPE[]}
   * @return {FlexArrayBuilder.<TYPE, ARRAY_TYPE>}
   */
  values(values) {
    TypeCheck.assertIsArray(values)
    this.#values = values
    return this
  }

  /**
   * @param {Array} jsonObject
   * @return {FlexArrayBuilder.<TYPE, ARRAY_TYPE>}
   * @param {?Class.<ARRAY_TYPE>} constructor
   */
  static fromObject(constructor, jsonObject) {
    const builder = new FlexArrayBuilder(constructor)
    builder.values(TypeCheck.assertIsArray(jsonObject))
    return builder
  }

  /**
   * @param {string} json
   * @return {FlexArrayBuilder.<TYPE, ARRAY_TYPE>}
   * @param {?Class.<ARRAY_TYPE>} constructor
   */
  static fromJson(constructor, json) {
    return FlexArrayBuilder.fromObject(constructor, JSON.parse(json))
  }

  /**
   * @param {ARRAY_TYPE} instance
   * @return {FlexArrayBuilder.<TYPE, ARRAY_TYPE>}
   * @param {?Class.<ARRAY_TYPE>} constructor
   */
  static from(constructor, instance) {
    const builder = new FlexArrayBuilder(constructor)
    builder.values(instance)
    return builder
  }

  /**
   * @return ARRAY_TYPE
   */
  build() {
    return new this.#arrayConstructor(...this.#values)
  }

}
