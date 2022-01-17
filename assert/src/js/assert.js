import {isNull} from './is'

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
 * @param {string} message %s will be replaced by messageArgs
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
    throw new TypeError(
      message.replace(/%s/g, () =>
        messageArgs[ArgIndex++]
      )
    )
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
    instance instanceof constructor, 'should be ' + (isNull(stringName) ? constructor.constructor.name : stringName) + ' given:' + JSON.stringify(instance) + (!(isNull(instance) || isUndefined(instance)) && 'constructor' in instance ? '[' + instance.constructor + ']' : '')
  )
  return instance
}
