import {assertType, isBoolean, isNull, isObject, isString} from '../../../assert/index.js'
import {deepFreezeSeal, valueObjectBuilderInterface, valueObjectInterface} from '../../../js-generator-helpers/index.js'

/**
 * @implements ValueObjectInterface
 */
class ModifierKeys extends valueObjectInterface() {
  /**
   * @param {boolean} alt
   * @param {boolean} ctrl
   * @param {boolean} meta
   * @param {boolean} shift
   * @private
   */
  constructor(alt, ctrl, meta, shift) {
    super()
    /**
     * @private
     */
    this._alt = alt

    /**
     * @private
     */
    this._ctrl = ctrl

    /**
     * @private
     */
    this._meta = meta

    /**
     * @private
     */
    this._shift = shift

    deepFreezeSeal(this)
  }

  /**
   * @returns {ModifierKeysBuilder}
   */
  static builder() {
    return new ModifierKeysBuilder()
  }

  /**
   * @param {ModifierKeys} instance
   * @returns {ModifierKeysBuilder}
   */
  static from(instance) {
    return ModifierKeysBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {ModifierKeysBuilder}
   */
  static fromObject(jsonObject) {
    return ModifierKeysBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {ModifierKeysBuilder}
   */
  static fromJson(json) {
    return ModifierKeysBuilder.fromJson(json)
  }

  /**
   * @returns {?boolean}
   */
  alt() {
    return this._alt
  }

  /**
   * @returns {?boolean}
   */
  ctrl() {
    return this._ctrl
  }

  /**
   * @returns {?boolean}
   */
  meta() {
    return this._meta
  }

  /**
   * @returns {?boolean}
   */
  shift() {
    return this._shift
  }

  /**
   * @param {boolean} alt
   * @returns {ModifierKeys}
   */
  withAlt(alt) {
    let builder = ModifierKeysBuilder.from(this)
    builder.alt(alt)
    return builder.build()
  }

  /**
   * @param {boolean} ctrl
   * @returns {ModifierKeys}
   */
  withCtrl(ctrl) {
    let builder = ModifierKeysBuilder.from(this)
    builder.ctrl(ctrl)
    return builder.build()
  }

  /**
   * @param {boolean} meta
   * @returns {ModifierKeys}
   */
  withMeta(meta) {
    let builder = ModifierKeysBuilder.from(this)
    builder.meta(meta)
    return builder.build()
  }

  /**
   * @param {boolean} shift
   * @returns {ModifierKeys}
   */
  withShift(shift) {
    let builder = ModifierKeysBuilder.from(this)
    builder.shift(shift)
    return builder.build()
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._alt)) {
      jsonObject['alt'] = this._alt
    }
    if (!isNull(this._ctrl)) {
      jsonObject['ctrl'] = this._ctrl
    }
    if (!isNull(this._meta)) {
      jsonObject['meta'] = this._meta
    }
    if (!isNull(this._shift)) {
      jsonObject['shift'] = this._shift
    }
    return jsonObject
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return this.toObject()
  }

  /**
   * @return {ModifierKeysBuilder}
   */
  toBuilder() {
    return ModifierKeysBuilder.from(this)
  }
}

export {ModifierKeys}

/**
 * @implements ValueObjectBuilderInterface
 */
class ModifierKeysBuilder extends valueObjectBuilderInterface() {
  /**
   * @constructor
   */
  constructor() {
    super()
    this._alt = null
    this._ctrl = null
    this._meta = null
    this._shift = null
  }

  static getPropertyFromObject(jsonObject, propertyName, normalizedPropertyName) {
    if (jsonObject[propertyName] !== undefined && !isNull(jsonObject[propertyName])) {
      return jsonObject[propertyName]
    } else if (jsonObject[normalizedPropertyName] !== undefined && !isNull(jsonObject[normalizedPropertyName])) {
      return jsonObject[normalizedPropertyName]
    } else {
      return null
    }
  }

  /**
   * @param {Object} jsonObject
   * @returns {ModifierKeysBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new ModifierKeysBuilder()
    let jsonProperty
    jsonProperty = ModifierKeysBuilder.getPropertyFromObject(jsonObject, 'alt', 'alt')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.alt(jsonProperty)
    }
    jsonProperty = ModifierKeysBuilder.getPropertyFromObject(jsonObject, 'ctrl', 'ctrl')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.ctrl(jsonProperty)
    }
    jsonProperty = ModifierKeysBuilder.getPropertyFromObject(jsonObject, 'meta', 'meta')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.meta(jsonProperty)
    }
    jsonProperty = ModifierKeysBuilder.getPropertyFromObject(jsonObject, 'shift', 'shift')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.shift(jsonProperty)
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {ModifierKeysBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {ModifierKeys} instance
   * @returns {ModifierKeysBuilder}
   */
  static from(instance) {
    assertType(instance instanceof ModifierKeys, 'input should be an instance of ModifierKeys')
    let builder = new ModifierKeysBuilder()
    builder.alt(instance.alt())
    builder.ctrl(instance.ctrl())
    builder.meta(instance.meta())
    builder.shift(instance.shift())
    return builder
  }

  /**
   * @param {?boolean} alt
   * @returns {ModifierKeysBuilder}
   */
  alt(alt) {
    if (!isNull(alt)) {
      assertType(isBoolean(alt), 'alt should be a bool')
    }
    this._alt = alt
    return this
  }

  /**
   * @param {?boolean} ctrl
   * @returns {ModifierKeysBuilder}
   */
  ctrl(ctrl) {
    if (!isNull(ctrl)) {
      assertType(isBoolean(ctrl), 'ctrl should be a bool')
    }
    this._ctrl = ctrl
    return this
  }

  /**
   * @param {?boolean} meta
   * @returns {ModifierKeysBuilder}
   */
  meta(meta) {
    if (!isNull(meta)) {
      assertType(isBoolean(meta), 'meta should be a bool')
    }
    this._meta = meta
    return this
  }

  /**
   * @param {?boolean} shift
   * @returns {ModifierKeysBuilder}
   */
  shift(shift) {
    if (!isNull(shift)) {
      assertType(isBoolean(shift), 'shift should be a bool')
    }
    this._shift = shift
    return this
  }

  /**
   * @returns {ModifierKeys}
   */
  build() {
    return new ModifierKeys(this._alt, this._ctrl, this._meta, this._shift)
  }
}

export {ModifierKeysBuilder}
