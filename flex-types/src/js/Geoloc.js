import { assertType, isObject, assert, isNumber, isNull, isString } from './__import__assert.js'
import { deepFreezeSeal } from './__import__js-generator-helpers.js'

class Geoloc {
  /**
   * @param {number} latitude
   * @param {number} longitude
   * @private
   */
  constructor(latitude, longitude) {
    /**
     * @private
     */
    this._latitude = latitude

    /**
     * @private
     */
    this._longitude = longitude

    deepFreezeSeal(this)
  }

  /**
   * @returns {number}
   */
  latitude() {
    return this._latitude
  }

  /**
   * @returns {number}
   */
  longitude() {
    return this._longitude
  }

  /**
   * @param {number} latitude
   * @returns {Geoloc}
   */
  withLatitude(latitude) {
    let builder = GeolocBuilder.from(this);
    builder.latitude(latitude)
    return builder.build()
  }

  /**
   * @param {number} longitude
   * @returns {Geoloc}
   */
  withLongitude(longitude) {
    let builder = GeolocBuilder.from(this);
    builder.longitude(longitude)
    return builder.build()
  }

  /**
   * @returns {GeolocBuilder}
   */
  static builder() {
    return new GeolocBuilder()
  }

  /**
   * @param {Geoloc} instance
   * @returns {GeolocBuilder}
   */
  static from(instance) {
    return GeolocBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {GeolocBuilder}
   */
  static fromObject(jsonObject) {
    return GeolocBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {GeolocBuilder}
   */
  static fromJson(json) {
    return GeolocBuilder.fromJson(json)
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._latitude)) {
      jsonObject['latitude'] = this._latitude
    }
    if (!isNull(this._longitude)) {
      jsonObject['longitude'] = this._longitude
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

export { Geoloc }

class GeolocBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._latitude = null
    this._longitude = null
  }

  /**
   * @param {?number} latitude
   * @returns {GeolocBuilder}
   */
  latitude(latitude) {
    if (!isNull(latitude)) {
      assertType(isNumber(latitude), 'latitude should be a number')
    }
    this._latitude = latitude
    return this
  }

  /**
   * @param {?number} longitude
   * @returns {GeolocBuilder}
   */
  longitude(longitude) {
    if (!isNull(longitude)) {
      assertType(isNumber(longitude), 'longitude should be a number')
    }
    this._longitude = longitude
    return this
  }

  /**
   * @returns {Geoloc}
   */
  build() {
    return new Geoloc(this._latitude, this._longitude)
  }

  /**
   * @param {Object} jsonObject
   * @returns {GeolocBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new GeolocBuilder()
    if (jsonObject['latitude'] !== undefined && !isNull(jsonObject['latitude'])) {
      builder.latitude(parseFloat(jsonObject['latitude']))
    }
    if (jsonObject['longitude'] !== undefined && !isNull(jsonObject['longitude'])) {
      builder.longitude(parseFloat(jsonObject['longitude']))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {GeolocBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Geoloc} instance
   * @returns {GeolocBuilder}
   */
  static from(instance) {
    assertType(instance instanceof Geoloc, 'input should be an instance of Geoloc')
    let builder = new GeolocBuilder()
    builder.latitude(instance.latitude())
    builder.longitude(instance.longitude())
    return builder
  }
}

export { GeolocBuilder }
