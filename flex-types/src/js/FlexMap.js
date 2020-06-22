/**
 * @template TYPE
 * @extends Map.<*, TYPE>
 */
export class FlexMap extends Map {
  /**
   *
   * @param {...<TYPE>} args
   */
  constructor(args) {
    super(args)
    this.forEach((a) => this._validate(a))
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
   * @param {function(value: TYPE, key: *, map: this)} callbackfn
   * @param {*?} thisArg
   */
  forEach(callbackfn, thisArg) {
    super.forEach(callbackfn, thisArg)
  }


  /**
   *
   * @param key
   * @return {TYPE}
   */
  get(key) {
    return (super.get(key) === undefined ? null : super.get(key))
  }

  /**
   *
   * @param key
   * @param {TYPE} value
   * @returns {this}
   */
  with(key, value) {
    const inst = new this.constructor(this.entries())
    inst.set(key, value)
    return inst
  }

  /**
   *
   * @param key
   * @returns {this}
   */
  without(key) {
    const inst = new this.constructor(this.entries())
    inst.delete(key)
    return inst
  }

  /**
   *
   * @param key
   * @param {TYPE} value
   * @return {this}
   */
  set(key, value) {
    this._validate(value)
    return super.set(key, value)
  }

  /**
   *
   * @return {Object.<*, TYPE>}
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
   * @return {Object<*, TYPE>}
   */
  toJSON() {
    return this.toObject()
  }
}

/**
 * @template TYPE
 */
export class FlexMapBuilder {
  constructor() {
    /**
     *
     * @type {IterableIterator<(string|Symbol), TYPE>}
     * @private
     */
    this.__entries = null
  }

  /**
   *
   * @param {IterableIterator<(string|Symbol), TYPE>} entries
   * @return {FlexMapBuilder}
   */
  entries(entries) {
    this.__entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexMapBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new FlexMapBuilder()
    builder.entries(Object.entries(jsonObject))
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexMapBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {FlexMapBuilder}
   */
  static from(instance) {
    const builder = new FlexMapBuilder()
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {FlexMap}
   */
  build() {
    return new FlexMap(this.__entries)
  }
}
