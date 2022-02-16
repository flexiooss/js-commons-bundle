import {isArray, isBoolean, isFunction, isNull, isPrimitive, isUndefined} from './is'

class AssertionError extends Error {
  constructor(...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AssertionError)
    }
    this.name = 'AssertionError'
    this.date = new Date()
  }
}

/**
 * @param {(boolean|Function)} assertion
 * @param {string} message %s will be replaced by messageArgs
 * @param {...string} messageArgs
 * @function
 * @throws AssertionError
 */
export const assert = (assertion, message, ...messageArgs) => {
  if (message === undefined) {
    throw new Error('`assert` function require an error messages argument')
  }
  if (!((typeof assertion === 'function') ? assertion() : assertion)) {
    let ArgIndex = 0
    throw new AssertionError(
      message.replace(/%s/g, () =>
        messageArgs[ArgIndex++]
      )
    )
  }
}
/**
 * @param {(boolean|Function)} assertion
 * @param {string|function():string} message %s will be replaced by messageArgs
 * @param {...string} messageArgs
 * @function
 * @throws TypeError
 */
export const assertType = (assertion, message, ...messageArgs) => {
  if (message === undefined) {
    throw new Error('`assert` function require an error messages argument')
  }
  if (!((typeof assertion === 'function') ? assertion() : assertion)) {
    let ArgIndex = 0

    if (isFunction(message)) {
      throw new TypeError(message.call(null))
    } else {
      throw new TypeError(message.replace(/%s/g, () =>
          messageArgs[ArgIndex++]
        )
      )
    }
  }
}


/**
 * @param {*} instance
 * @param {Class} constructor
 * @return {any}
 * @throws TypeError
 * @param {?string} [stringName=null]
 */
export const assertInstanceOf = (instance, constructor, stringName = null) => {
  assertType(
    instance instanceof constructor,
    () => `should be ${(isNull(stringName) ? constructor.name : stringName)} given: ${formatType(instance)}`
  )
  return instance
}

/**
 * @param {*} v
 * @return {string}
 */
export const formatType = (v) => {
  if (isUndefined(v)) {
    return 'undefined'
  }
  if (isNull(v)) {
    return 'null'
  }
  /**
   * @type {string}
   */
  let constructor = ''
  /**
   * @type {string}
   */
  let value = ''
  /**
   * @type {string}
   */
  let length = ''

  if (isPrimitive(v)) {
    constructor = typeof v
    value = v
    if (isBoolean(v)) {
      value = v ? 'true' : 'false'
    }
  } else {
    if (isFunction(v)) {
      value = v.toString()
    } else {
      try {
        value = JSON.stringify(v)
      } catch (e) {
        value = 'value not serializable'
      }
    }
    try {
      constructor = ('constructor' in v) ? v.constructor.name : typeof v
    } catch (e) {
      constructor = 'no constructor found'
    }
    if (isArray(v)) {
      length = `(${v.length})`
    }
  }
  return `[${constructor}]${length}${value}`
}