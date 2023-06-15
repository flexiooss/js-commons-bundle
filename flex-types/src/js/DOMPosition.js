import { assertType, isInteger, isObject, assert, isNull, isString } from '../../../assert/index.js'
import { deepFreezeSeal } from '../../../js-generator-helpers/index.js'

class DOMPosition {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @private
   */
  constructor(x, y, width, height) {
    /**
     * @private
     */
    this._x = x

    /**
     * @private
     */
    this._y = y

    /**
     * @private
     */
    this._width = width

    /**
     * @private
     */
    this._height = height

    deepFreezeSeal(this)
  }

  /**
   * @returns {number}
   */
  x() {
    return this._x
  }

  /**
   * @returns {number}
   */
  y() {
    return this._y
  }

  /**
   * @returns {number}
   */
  width() {
    return this._width
  }

  /**
   * @returns {number}
   */
  height() {
    return this._height
  }

  /**
   * @param {number} x
   * @returns {DOMPosition}
   */
  withX(x) {
    let builder = DOMPositionBuilder.from(this);
    builder.x(x)
    return builder.build()
  }

  /**
   * @param {number} y
   * @returns {DOMPosition}
   */
  withY(y) {
    let builder = DOMPositionBuilder.from(this);
    builder.y(y)
    return builder.build()
  }

  /**
   * @param {number} width
   * @returns {DOMPosition}
   */
  withWidth(width) {
    let builder = DOMPositionBuilder.from(this);
    builder.width(width)
    return builder.build()
  }

  /**
   * @param {number} height
   * @returns {DOMPosition}
   */
  withHeight(height) {
    let builder = DOMPositionBuilder.from(this);
    builder.height(height)
    return builder.build()
  }

  /**
   * @returns {DOMPositionBuilder}
   */
  static builder() {
    return new DOMPositionBuilder()
  }

  /**
   * @param {DOMPosition} instance
   * @returns {DOMPositionBuilder}
   */
  static from(instance) {
    return DOMPositionBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {DOMPositionBuilder}
   */
  static fromObject(jsonObject) {
    return DOMPositionBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {DOMPositionBuilder}
   */
  static fromJson(json) {
    return DOMPositionBuilder.fromJson(json)
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._x)) {
      jsonObject['x'] = this._x
    }
    if (!isNull(this._y)) {
      jsonObject['y'] = this._y
    }
    if (!isNull(this._width)) {
      jsonObject['width'] = this._width
    }
    if (!isNull(this._height)) {
      jsonObject['height'] = this._height
    }
    return jsonObject
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return this.toObject()
  }
}

export { DOMPosition }

class DOMPositionBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._x = null
    this._y = null
    this._width = null
    this._height = null
  }
  
  /**
   * @param {?number} x
   * @returns {DOMPositionBuilder}
   */
  x(x) {
    if (!isNull(x)) {
      assertType(isInteger(x), 'x should be a number')
    }
    this._x = x
    return this
  }

  /**
   * @param {?number} y
   * @returns {DOMPositionBuilder}
   */
  y(y) {
    if (!isNull(y)) {
      assertType(isInteger(y), 'y should be a number')
    }
    this._y = y
    return this
  }

  /**
   * @param {?number} width
   * @returns {DOMPositionBuilder}
   */
  width(width) {
    if (!isNull(width)) {
      assertType(isInteger(width), 'width should be a number')
    }
    this._width = width
    return this
  }

  /**
   * @param {?number} height
   * @returns {DOMPositionBuilder}
   */
  height(height) {
    if (!isNull(height)) {
      assertType(isInteger(height), 'height should be a number')
    }
    this._height = height
    return this
  }

  /**
   * @returns {DOMPosition}
   */
  build() {
    return new DOMPosition(this._x, this._y, this._width, this._height)
  }

  static getPropertyFromObject( jsonObject, propertyName, normalizedPropertyName ){
    if( jsonObject[propertyName] !== undefined && !isNull( jsonObject[propertyName] )){
      return jsonObject[propertyName];
    }
    else if( jsonObject[normalizedPropertyName] !== undefined && !isNull( jsonObject[normalizedPropertyName] )){
      return jsonObject[normalizedPropertyName];
    }
    else {
      return null;
    }
  }
  /**
   * @param {Object} jsonObject
   * @returns {DOMPositionBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new DOMPositionBuilder()
    let jsonProperty;
    jsonProperty = DOMPositionBuilder.getPropertyFromObject( jsonObject, 'x', 'x' );
    if( jsonProperty !== undefined && !isNull( jsonProperty )){
      builder.x(parseInt(jsonProperty))
    }
    jsonProperty = DOMPositionBuilder.getPropertyFromObject( jsonObject, 'y', 'y' );
    if( jsonProperty !== undefined && !isNull( jsonProperty )){
      builder.y(parseInt(jsonProperty))
    }
    jsonProperty = DOMPositionBuilder.getPropertyFromObject( jsonObject, 'width', 'width' );
    if( jsonProperty !== undefined && !isNull( jsonProperty )){
      builder.width(parseInt(jsonProperty))
    }
    jsonProperty = DOMPositionBuilder.getPropertyFromObject( jsonObject, 'height', 'height' );
    if( jsonProperty !== undefined && !isNull( jsonProperty )){
      builder.height(parseInt(jsonProperty))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {DOMPositionBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {DOMPosition} instance
   * @returns {DOMPositionBuilder}
   */
  static from(instance) {
    assertType(instance instanceof DOMPosition, 'input should be an instance of DOMPosition')
    let builder = new DOMPositionBuilder()
    builder.x(instance.x())
    builder.y(instance.y())
    builder.width(instance.width())
    builder.height(instance.height())
    return builder
  }
}

export { DOMPositionBuilder }
