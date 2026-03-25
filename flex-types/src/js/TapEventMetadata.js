import {assertType, isNull, isObject, isString} from '../../../assert/index.js'
import {deepFreezeSeal, valueObjectBuilderInterface, valueObjectInterface} from '../../../js-generator-helpers/index.js'
import {DOMPosition, DOMPositionBuilder} from './DOMPosition.js'
import {ModifierKeys, ModifierKeysBuilder} from './ModifierKeys.js'

/**
 * @implements ValueObjectInterface
 */
class TapEventMetadata extends valueObjectInterface() {
  /**
   * @param {DOMPosition} domPosition
   * @param {ModifierKeys} modifiers
   * @private
   */
  constructor(domPosition, modifiers) {
    super()
    /**
     * @private
     */
    this._domPosition = domPosition

    /**
     * @private
     */
    this._modifiers = modifiers

    deepFreezeSeal(this)
  }

  /**
   * @returns {TapEventMetadataBuilder}
   */
  static builder() {
    return new TapEventMetadataBuilder()
  }

  /**
   * @param {TapEventMetadata} instance
   * @returns {TapEventMetadataBuilder}
   */
  static from(instance) {
    return TapEventMetadataBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {TapEventMetadataBuilder}
   */
  static fromObject(jsonObject) {
    return TapEventMetadataBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {TapEventMetadataBuilder}
   */
  static fromJson(json) {
    return TapEventMetadataBuilder.fromJson(json)
  }

  /**
   * @returns {?DOMPosition}
   */
  domPosition() {
    return this._domPosition
  }

  /**
   * @returns {?ModifierKeys}
   */
  modifiers() {
    return this._modifiers
  }

  /**
   * @param {DOMPosition} domPosition
   * @returns {TapEventMetadata}
   */
  withDomPosition(domPosition) {
    let builder = TapEventMetadataBuilder.from(this)
    builder.domPosition(domPosition)
    return builder.build()
  }

  /**
   * @param {ModifierKeys} modifiers
   * @returns {TapEventMetadata}
   */
  withModifiers(modifiers) {
    let builder = TapEventMetadataBuilder.from(this)
    builder.modifiers(modifiers)
    return builder.build()
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._domPosition)) {
      jsonObject['domPosition'] = this._domPosition.toObject()
    }
    if (!isNull(this._modifiers)) {
      jsonObject['modifiers'] = this._modifiers.toObject()
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
   * @return {TapEventMetadataBuilder}
   */
  toBuilder() {
    return TapEventMetadataBuilder.from(this)
  }
}

export {TapEventMetadata}

/**
 * @implements ValueObjectBuilderInterface
 */
class TapEventMetadataBuilder extends valueObjectBuilderInterface() {
  /**
   * @constructor
   */
  constructor() {
    super()
    this._domPosition = null
    this._modifiers = null
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
   * @returns {TapEventMetadataBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new TapEventMetadataBuilder()
    let jsonProperty
    jsonProperty = TapEventMetadataBuilder.getPropertyFromObject(jsonObject, 'domPosition', 'domPosition')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.domPosition(DOMPositionBuilder.fromObject(jsonProperty).build())
    }
    jsonProperty = TapEventMetadataBuilder.getPropertyFromObject(jsonObject, 'modifiers', 'modifiers')
    if (jsonProperty !== undefined && !isNull(jsonProperty)) {
      builder.modifiers(ModifierKeysBuilder.fromObject(jsonProperty).build())
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {TapEventMetadataBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {TapEventMetadata} instance
   * @returns {TapEventMetadataBuilder}
   */
  static from(instance) {
    assertType(instance instanceof TapEventMetadata, 'input should be an instance of TapEventMetadata')
    let builder = new TapEventMetadataBuilder()
    builder.domPosition(instance.domPosition())
    builder.modifiers(instance.modifiers())
    return builder
  }

  /**
   * @param {?DOMPosition} domPosition
   * @returns {TapEventMetadataBuilder}
   */
  domPosition(domPosition) {
    if (!isNull(domPosition)) {
      assertType(domPosition instanceof DOMPosition, 'domPosition should be a DOMPosition')
    }
    this._domPosition = domPosition
    return this
  }

  /**
   * @param {?ModifierKeys} modifiers
   * @returns {TapEventMetadataBuilder}
   */
  modifiers(modifiers) {
    if (!isNull(modifiers)) {
      assertType(modifiers instanceof ModifierKeys, 'modifiers should be a ModifierKeys')
    }
    this._modifiers = modifiers
    return this
  }

  /**
   * @returns {TapEventMetadata}
   */
  build() {
    return new TapEventMetadata(this._domPosition, this._modifiers)
  }
}

export {TapEventMetadataBuilder}
