import {TypeCheck} from '../../../assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'

/**
 * @template KEY, TYPE
 * @extends Map<KEY,TYPE>
 */
export class FlexMap extends Map {
  /**
   * @type {boolean}
   */
  #frozen = false

  /**
   * @param {...TYPE} args
   */
  constructor(args) {
    super()
    this.forEach((a) => this._validate(a))
  }

  /**
   * @return {boolean}
   */
  isFrozen() {
    return this.#frozen
  }

  /**
   * @return {this}
   */
  freeze() {
    deepFreezeSeal(this)
    this.#frozen = true
    return this
  }

  /**
   * @param {TYPE} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    throw new TypeError('Should be implemented')
  }

  /**
   * @param {function(value: TYPE, key: KEY, map: this)} callback
   * @param {*?} thisArg
   */
  forEach(callback, thisArg) {
    super.forEach(callback, thisArg)
  }


  /**
   * @param {KEY} key
   * @return {TYPE}
   */
  get(key) {
    return (super.get(key) === undefined ? null : super.get(key))
  }

  /**
   * @param {KEY} key
   * @param {TYPE} value
   * @returns {this}
   */
  with(key, value) {
    const inst = new this.constructor(this.entries())
    inst.set(key, value)
    if (this.isFrozen()) {
      inst.freeze()
    }
    return inst
  }

  /**
   * @param {KEY} key
   * @returns {this}
   */
  without(key) {
    const inst = new this.constructor(this.entries())
    inst.delete(key)
    if (this.isFrozen()) {
      inst.freeze()
    }
    return inst
  }

  /**
   * @param {KEY} key
   * @param {TYPE} value
   * @return {this}
   */
  set(key, value) {
    this._validate(value)
    return super.set(key, value)
  }

  /**
   * @return {Object<KEY,TYPE>}
   */
  toObject() {
    let obj = Object.create(null)
    for (let [k, v] of this) {
      obj[k] = v
    }
    return obj
  }

  /**
   *
   * @return {Object<KEY,TYPE>}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   * @returns {FlexMapBuilder}
   */
  static builder() {
    return new FlexMapBuilder(this.constructor)
  }

  /**
   * @param {FlexMap} instance
   * @returns {FlexMapBuilder}
   */
  static from(instance) {
    return FlexMapBuilder.from(this.constructor, instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexMapBuilder}
   */
  static fromObject(jsonObject) {
    return FlexMapBuilder.fromObject(this.constructor, jsonObject)
  }

  /**
   * @param {string} json
   * @returns {FlexMapBuilder}
   */
  static fromJson(json) {
    return FlexMapBuilder.fromJson(this.constructor, json)
  }
}

/**
 * @template KEY, TYPE
 */
export class FlexMapBuilder {
  /**
   * @type {FlexMap<KEY,TYPE>}
   */
  #mapConstructor = null
  /**
   * @type {?IterableIterator<(string|Symbol), TYPE>}
   */
  #entries = null

  /**
   * @param {FlexMap<KEY,TYPE>} mapConstructor
   */
  constructor(mapConstructor) {
    this.#mapConstructor = TypeCheck.assertIsClass(constructor)
  }

  /**
   *
   * @param {IterableIterator<(string|Symbol), TYPE>} entries
   * @return {FlexMapBuilder}
   */
  entries(entries) {
    this.#entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexMapBuilder}
   * @param  {FlexMap<KEY,TYPE>} mapConstructor
   */
  static fromObject(mapConstructor, jsonObject) {
    const builder = new FlexMapBuilder(mapConstructor)
    builder.entries(Object.entries(jsonObject))
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexMapBuilder}
   * @param  {FlexMap<KEY,TYPE>} mapConstructor
   */
  static fromJson(mapConstructor, json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(mapConstructor, jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {FlexMapBuilder}
   * @param  {FlexMap<KEY,TYPE>} mapConstructor
   */
  static from(mapConstructor, instance) {
    const builder = new FlexMapBuilder(mapConstructor)
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {FlexMap}
   */
  build() {
    return new this.#mapConstructor(this.#entries)
  }
}
