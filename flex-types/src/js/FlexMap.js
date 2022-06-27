import {NotOverrideException, TypeCheck} from '../../../assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'

/**
 * @template TYPE
 * @extends Map.<*, TYPE>
 */
export class FlexMap extends Map {
  /**
   * @type {boolean}
   */
  #frozen = false

  /**
   * @param {...<TYPE>} args
   */
  constructor(args) {
    super(args)
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
    this.#frozen = true
    this.forEach((v) => {
      deepFreezeSeal(v)
    })
    this.delete = function (key) {
      throw new Error('Can\'t delete property ' + key + ', map is frozen')
    }

    this.clear = function () {
      throw new Error('Can\'t clear map, map is frozen')
    }
    deepFreezeSeal(this)
    return this
  }


  /**
   * @param {*} v
   * @protected
   * @throws {NotOverrideException}
   * @abstract
   */
  _validate(v) {
    throw NotOverrideException.FROM_ABSTRACT('FlexMap')
  }

  /**
   * @param {function(value: TYPE, key: *, map: this)} callbackfn
   * @param {*?} thisArg
   */
  forEach(callbackfn, thisArg) {
    super.forEach(callbackfn, thisArg)
  }

  /**
   * @param key
   * @return {?TYPE}
   */
  get(key) {
    return (super.get(key) === undefined ? null : super.get(key))
  }

  /**
   * @param key
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
   * @param key
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
   * @param key
   * @param {TYPE} value
   * @return {this}
   */
  set(key, value) {
    if (this.#frozen) {
      throw new Error('Can\'t add property ' + key + ', map is not extensible')
    }

    this._validate(value)
    return super.set(key, value)
  }

  /**
   * @return {Object.<*, TYPE>}
   */
  toObject() {
    let obj = {}
    for (let [k, v] of this) {
      obj[k] = v
    }
    return obj
  }

  /**
   *
   * @return {Object<*, TYPE>}
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
 * @template TYPE
 */
export class FlexMapBuilder {
  /**
   * @type {FlexMap.<*,TYPE>}
   */
  #mapConstructor = null
  /**
   * @type {?IterableIterator<(string|Symbol), TYPE>}
   */
  #entries = null

  /**
   * @param {FlexMap.<*,TYPE>} mapConstructor
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
   * @param  {FlexMap.<*,TYPE>} mapConstructor
   */
  static fromObject(mapConstructor, jsonObject) {
    const builder = new FlexMapBuilder(mapConstructor)
    builder.entries(Object.entries(jsonObject))
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexMapBuilder}
   * @param  {FlexMap.<*,TYPE>} mapConstructor
   */
  static fromJson(mapConstructor, json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(mapConstructor, jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {FlexMapBuilder}
   * @param  {FlexMap.<*,TYPE>} mapConstructor
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
