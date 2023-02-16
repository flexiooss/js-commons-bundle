import {  TypeCheck} from './__import__assert.js'
import {IndexError} from './IndexError.js'


const INITIALIZED = Symbol('initialized')


/**
 * This is an abstract class that is not intended to be
 * used directly. Extend it to turn your class into an enum
 * (initialization is performed via `MyClass.initEnum()`).
 */
export class FlexEnum {
  /**
   * `initEnum()` closes the class. Then calling this constructor
   * throws an exception.
   *
   * If your subclass has a constructor then you can control
   * what properties are added to `this` via the argument you
   * pass to `super()`. No arguments are fine, too.
   */
  constructor(instanceProperties = undefined) {
    // new.target would be better than this.constructor,
    // but isn’t supported by Babel
    if ({}.hasOwnProperty.call(this.constructor, INITIALIZED)) {
      throw new Error('Enum classes can’t be instantiated')
    }
    if (typeof instanceProperties === 'object' && instanceProperties !== null) {
      copyProperties(this, instanceProperties)
    }
  }

  /**
   * Set up the enum, close the class.
   *
   * @param arg Either an object whose properties provide the names
   * and values (which must be mutable objects) of the enum constants.
   * Or an Array whose elements are used as the names of the enum constants
   * The values are create by instantiating the current class.
   */
  static initEnum(arg) {

    TypeCheck.assertIsArray(arg)

    Object.defineProperty(this, 'enumValues', {
      value: [],
      configurable: false,
      writable: false,
      enumerable: true
    })
    if (Array.isArray(arg)) {
      this._enumValuesFromArray(arg)
    } else {
      this._enumValuesFromObject(arg)
    }
    Object.freeze(this.enumValues)
    this[INITIALIZED] = true
    return this
  }

  static _enumValuesFromArray(arr) {
    for (let key of arr) {
      this._pushEnumValue(new this(), key)
    }
  }

  static _enumValuesFromObject(obj) {
    for (let key of Object.keys(obj)) {
      let value = new this(obj[key])
      this._pushEnumValue(value, key)
    }
  }

  static _pushEnumValue(enumValue, name) {
    enumValue.__name = name
    enumValue.__ordinal = this.enumValues.length
    Object.defineProperty(this, name, {
      value: enumValue,
      configurable: false,
      writable: false,
      enumerable: true
    })
    this.enumValues.push(enumValue)
  }

  /**
   * Given the name of an enum constant, return its value.
   * @return {this}
   */
  static enumValueOf(name) {
    const ret = this.enumValues.find(x => x.__name === name)
    if (typeof ret === 'undefined') {
      throw IndexError.BAD_ENUM_NAME(name)
    }
    return ret
  }

  /**
   * Make enum classes iterable
   */
  static [Symbol.iterator]() {
    return this.enumValues[Symbol.iterator]()
  }

  /**
   * Default `toString()` method for enum constant.
   */
  toString() {
    return `${this.__name}`
    // return `${this.constructor.name}.${this.__name}`
  }

  /**
   *
   * @returns {string}
   */
  name() {
    return this.__name
  }

  /**
   *
   * @returns {number}
   */
  ordinal() {
    return this.__ordinal
  }

  /**
   *
   * @returns {string}
   */
  toJSON() {
    return this.toString()
  }
  /**
   * @returns {string}
   */
  toObject() {
    return this.toString()
  }
}


export function copyProperties(target, source) {
  // Ideally, we’d use Reflect.ownKeys() here,
  // but I don’t want to depend on a polyfill
  for (const key of Object.getOwnPropertyNames(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key)
    Object.defineProperty(target, key, desc)
  }
  return target
}
