import {TestCase} from 'code-altimeter-js'
import {
  isArray,
  isBoolean,
  isFunction,
  isIterable,
  isNull,
  isNumber,
  isInteger,
  isFloat,
  isObject,
  isStrictObject,
  isPrimitive, isRegex,
  isString,
  isSymbol,
  isUndefined,
  isClass,
  isBlob,
  isInt8Array,
  isArrayBuffer
} from '../js/is'


const assert = require('assert')


class FakeClass {
}


export class TestIs extends TestCase {
  testIsUndefined() {
    assert(isUndefined(undefined) === true)
    assert(isUndefined(0) === false)
    assert(isUndefined(1) === false)
    assert(isUndefined([]) === false)
    assert(isUndefined(null) === false)
    assert(isUndefined('key') === false)
    assert(isUndefined('') === false)
    assert(isUndefined(true) === false)
    assert(isUndefined(false) === false)
    assert(isUndefined(NaN) === false)
    assert(isUndefined({}) === false)
    assert(isUndefined({'key': 1}) === false)
    assert(isUndefined(Symbol('desc')) === false)
    assert(isUndefined(() => {
    }) === false)
    assert(isUndefined(FakeClass) === false)
    assert(isUndefined(new RegExp('abc')) === false)
    assert(isUndefined(new RegExp(/abc/)) === false)
  }

  testIsNull() {
    assert(isNull(undefined) === false)
    assert(isNull(0) === false)
    assert(isNull(1) === false)
    assert(isNull([]) === false)
    assert(isNull(null) === true)
    assert(isNull('key') === false)
    assert(isNull('') === false)
    assert(isNull(true) === false)
    assert(isNull(false) === false)
    assert(isNull(NaN) === false)
    assert(isNull({}) === false)
    assert(isNull({'key': 1}) === false)
    assert(isNull(Symbol('desc')) === false)
    assert(isNull(() => {
    }) === false)
    assert(isNull(FakeClass) === false)
    assert(isNull(new RegExp('abc')) === false)
    assert(isNull(new RegExp(/abc/)) === false)
  }

  testIsString() {
    assert(isString(undefined) === false)
    assert(isString(0) === false)
    assert(isString(1) === false)
    assert(isString([]) === false)
    assert(isString(null) === false)
    assert(isString('key') === true)
    assert(isString('') === true)
    assert(isString(true) === false)
    assert(isString(false) === false)
    assert(isString(NaN) === false)
    assert(isString({}) === false)
    assert(isString({'key': 1}) === false)
    assert(isString(Symbol('desc')) === false)
    assert(isString(() => {
    }) === false)
    assert(isString(FakeClass) === false)
    assert(isString(new RegExp('abc')) === false)
    assert(isString(new RegExp(/abc/)) === false)
  }

  testIsBoolean() {
    assert(isBoolean(undefined) === false)
    assert(isBoolean(0) === false)
    assert(isBoolean(1) === false)
    assert(isBoolean([]) === false)
    assert(isBoolean(null) === false)
    assert(isBoolean('key') === false)
    assert(isBoolean('') === false)
    assert(isBoolean(true) === true)
    assert(isBoolean(false) === true)
    assert(isBoolean(NaN) === false)
    assert(isBoolean({}) === false)
    assert(isBoolean({'key': 1}) === false)
    assert(isBoolean(Symbol('desc')) === false)
    assert(isBoolean(() => {
    }) === false)
    assert(isBoolean(FakeClass) === false)
    assert(isBoolean(new RegExp('abc')) === false)
    assert(isBoolean(new RegExp(/abc/)) === false)
  }

  testIsNumber() {
    assert(isNumber(undefined) === false)
    assert(isNumber(0) === true)
    assert(isNumber(1) === true)
    assert(isNumber(-1) === true)
    assert(isNumber(-0.5) === true)
    assert(isNumber([]) === false)
    assert(isNumber(null) === false)
    assert(isNumber('key') === false)
    assert(isNumber('') === false)
    assert(isNumber(true) === false)
    assert(isNumber(false) === false)
    assert(isNumber(NaN) === false)
    assert(isNumber({}) === false)
    assert(isNumber({'key': 1}) === false)
    assert(isNumber(Symbol('desc')) === false)
    assert(isNumber(() => {
    }) === false)
    assert(isNumber(FakeClass) === false)
    assert(isNumber(new RegExp('abc')) === false)
    assert(isNumber(new RegExp(/abc/)) === false)
  }

  testIsInteger() {
    assert(isInteger(undefined) === false)
    assert(isInteger(0) === true)
    assert(isInteger(1) === true)
    assert(isInteger(1.0) === true, 'not float')
    assert(isInteger(-1) === true)
    assert(isInteger(-0.5) === false, 'not float')
    assert(isInteger([]) === false)
    assert(isInteger(null) === false)
    assert(isInteger('key') === false)
    assert(isInteger('') === false)
    assert(isInteger(true) === false)
    assert(isInteger(false) === false)
    assert(isInteger(NaN) === false)
    assert(isInteger({}) === false)
    assert(isInteger({'key': 1}) === false)
    assert(isInteger(Symbol('desc')) === false)
    assert(isInteger(() => {
    }) === false)
    assert(isInteger(FakeClass) === false)
    assert(isInteger(new RegExp('abc')) === false)
    assert(isInteger(new RegExp(/abc/)) === false)
  }

  testIsFloat() {
    assert(isFloat(undefined) === false)
    assert(isFloat(0) === false)
    assert(isFloat(1) === false)
    assert(isFloat(1.0) === false, 'is float ? ')
    assert(isFloat(-1) === false)
    assert(isFloat(-0.5) === true, 'is float')
    assert(isFloat([]) === false)
    assert(isFloat(null) === false)
    assert(isFloat('key') === false)
    assert(isFloat('') === false)
    assert(isFloat(true) === false)
    assert(isFloat(false) === false)
    assert(isFloat(NaN) === false)
    assert(isFloat({}) === false)
    assert(isFloat({'key': 1}) === false)
    assert(isFloat(Symbol('desc')) === false)
    assert(isFloat(() => {
    }) === false)
    assert(isFloat(FakeClass) === false)
    assert(isFloat(new RegExp('abc')) === false)
    assert(isFloat(new RegExp(/abc/)) === false)
  }

  testIsObject() {
    assert(isObject(undefined) === false)
    assert(isObject(0) === false)
    assert(isObject(1) === false)
    assert(isObject([]) === false)
    assert(isObject(null) === false)
    assert(isObject('key') === false)
    assert(isObject('') === false)
    assert(isObject(true) === false)
    assert(isObject(false) === false)
    assert(isObject(NaN) === false)
    assert(isObject({}) === true)
    assert(isObject({'key': 1}) === true)
    assert(isObject(Symbol('desc')) === false)
    assert(isObject(() => {
    }) === false)
    assert(isObject(FakeClass) === false)
    assert(isObject(new RegExp('abc')) === false)
    assert(isObject(new RegExp(/abc/)) === false)
  }

  testIsStrictObject() {
    assert(isStrictObject(undefined) === false)
    assert(isStrictObject(0) === false)
    assert(isStrictObject(1) === false)
    assert(isStrictObject([]) === false)
    assert(isStrictObject(null) === false)
    assert(isStrictObject('key') === false)
    assert(isStrictObject('') === false)
    assert(isStrictObject(true) === false)
    assert(isStrictObject(false) === false)
    assert(isStrictObject(NaN) === false)
    assert(isStrictObject({}) === true)
    assert(isStrictObject({'key': 1}) === true)
    assert(isStrictObject(Symbol('desc')) === false)
    assert(isStrictObject(() => {
    }) === false)
    assert(isStrictObject(FakeClass) === false)
    assert(isStrictObject(new FakeClass()) === false)
    assert(isStrictObject(new RegExp('abc')) === false)
    assert(isStrictObject(new RegExp(/abc/)) === false)
  }

  testIsFunction() {
    assert(isFunction(undefined) === false)
    assert(isFunction(0) === false)
    assert(isFunction(1) === false)
    assert(isFunction([]) === false)
    assert(isFunction(null) === false)
    assert(isFunction('key') === false)
    assert(isFunction('') === false)
    assert(isFunction(true) === false)
    assert(isFunction(false) === false)
    assert(isFunction(NaN) === false)
    assert(isFunction({}) === false)
    assert(isFunction({'key': 1}) === false)
    assert(isFunction(Symbol('desc')) === false)
    assert(isFunction(() => {
    }) === true)
    assert(isFunction(FakeClass) === false)
    assert(isFunction(new RegExp('abc')) === false)
    assert(isFunction(new RegExp(/abc/)) === false)
  }

  testIsTypePrimitive() {
    assert(isPrimitive(undefined) === false)
    assert(isPrimitive(0) === true)
    assert(isPrimitive(1) === true)
    assert(isPrimitive([]) === false)
    assert(isPrimitive(null) === false)
    assert(isPrimitive('key') === true)
    assert(isPrimitive('') === true)
    assert(isPrimitive(true) === true)
    assert(isPrimitive(false) === true)
    assert(isPrimitive(NaN) === false)
    assert(isPrimitive({}) === false)
    assert(isPrimitive({'key': 1}) === false)
    assert(isPrimitive(Symbol('desc')) === true)
    assert(isPrimitive(() => {
    }) === false)
    assert(isPrimitive(FakeClass) === false)
    assert(isPrimitive(new RegExp('abc')) === false)
    assert(isPrimitive(new RegExp(/abc/)) === false)
  }

  testIsIterable() {
    assert(isIterable(undefined) === false)
    assert(isIterable(0) === false)
    assert(isIterable(1) === false)
    assert(isIterable([]) === true)
    assert(isIterable(null) === false)
    assert(isIterable('key') === true)
    assert(isIterable('') === true)
    assert(isIterable(true) === false)
    assert(isIterable(false) === false)
    assert(isIterable(NaN) === false)
    assert(isIterable({}) === false)
    assert(isIterable({'key': 1}) === false)
    assert(isIterable(Symbol('desc')) === false)
    assert(isIterable(() => {
    }) === false)
    assert(isIterable(FakeClass) === false)
    assert(isIterable(new RegExp('abc')) === false)
    assert(isIterable(new RegExp(/abc/)) === false)
  }

  testIsSymbol() {
    assert(isSymbol(undefined) === false)
    assert(isSymbol(0) === false)
    assert(isSymbol(1) === false)
    assert(isSymbol([]) === false)
    assert(isSymbol(null) === false)
    assert(isSymbol('key') === false)
    assert(isSymbol('') === false)
    assert(isSymbol(true) === false)
    assert(isSymbol(false) === false)
    assert(isSymbol(NaN) === false)
    assert(isSymbol({}) === false)
    assert(isSymbol({'key': 1}) === false)
    assert(isSymbol(Symbol('desc')) === true)
    assert(isSymbol(() => {
    }) === false)
    assert(isSymbol(FakeClass) === false)
    assert(isSymbol(new RegExp('abc')) === false)
    assert(isSymbol(new RegExp(/abc/)) === false)
  }

  testIsArray() {
    assert(isArray(undefined) === false)
    assert(isArray(0) === false)
    assert(isArray(1) === false)
    assert(isArray([]) === true)
    assert(isArray(null) === false)
    assert(isArray('key') === false)
    assert(isArray('') === false)
    assert(isArray(true) === false)
    assert(isArray(false) === false)
    assert(isArray(NaN) === false)
    assert(isArray({}) === false)
    assert(isArray({'key': 1}) === false)
    assert(isArray(Symbol('desc')) === false)
    assert(isArray(() => {
    }) === false)
    assert(isArray(FakeClass) === false)
    assert(isArray(new RegExp('abc')) === false)
    assert(isArray(new RegExp(/abc/)) === false)
  }

  testIsClass() {
    assert(isClass(undefined) === false)
    assert(isClass(0) === false)
    assert(isClass(1) === false)
    assert(isClass([]) === false)
    assert(isClass(null) === false)
    assert(isClass('key') === false)
    assert(isClass('') === false)
    assert(isClass(true) === false)
    assert(isClass(false) === false)
    assert(isClass(NaN) === false)
    assert(isClass({}) === false)
    assert(isClass({'key': 1}) === false)
    assert(isClass(Symbol('desc')) === false)
    assert(isClass(() => {
    }) === false)
    assert(isClass(FakeClass) === true)
    assert(isClass(new RegExp('abc')) === false)
    assert(isClass(new RegExp(/abc/)) === false)

  }

  testIsRegex() {
    assert(isRegex(undefined) === false)
    assert(isRegex([]) === false)
    assert(isRegex(/abc/) === true)
    assert(isRegex(new RegExp('abc')) === true)
    assert(isRegex(new RegExp(/abc/)) === true)
    assert(isRegex('') === false)
    assert(isRegex(null) === false)
    assert(isRegex({}) === false)
    assert(isRegex(1) === false)
    assert(isRegex(NaN) === false)
    assert(isRegex(NaN) === false)
    assert(isRegex(Symbol('desc')) === false)
    assert(isRegex(() => {
    }) === false)
    assert(isRegex(FakeClass) === false)

  }

  testIsBlob() {
    assert(isBlob(undefined) === false)
    assert(isBlob(0) === false)
    assert(isBlob(1) === false)
    assert(isBlob([]) === false)
    assert(isBlob(null) === false)
    assert(isBlob('key') === false)
    assert(isBlob('') === false)
    assert(isBlob(true) === false)
    assert(isBlob(false) === false)
    assert(isBlob(NaN) === false)
    assert(isBlob({}) === false)
    assert(isBlob({'key': 1}) === false)
    assert(isBlob(Symbol('desc')) === false)
    assert(isBlob(() => {
    }) === false)
    assert(isBlob(FakeClass) === false)
    assert(isBlob(new RegExp('abc')) === false)
    assert(isBlob(new RegExp(/abc/)) === false)
//    assert(isBlob( new Blob(['test text'], {type: 'text/plain'})) === true)

  }

  testIsInt8Array() {
    assert(isInt8Array(undefined) === false)
    assert(isInt8Array(0) === false)
    assert(isInt8Array(1) === false)
    assert(isInt8Array([]) === false)
    assert(isInt8Array(null) === false)
    assert(isInt8Array('key') === false)
    assert(isInt8Array('') === false)
    assert(isInt8Array(true) === false)
    assert(isInt8Array(false) === false)
    assert(isInt8Array(NaN) === false)
    assert(isInt8Array({}) === false)
    assert(isInt8Array({'key': 1}) === false)
    assert(isInt8Array(Symbol('desc')) === false)
    assert(isInt8Array(() => {
    }) === false)
    assert(isInt8Array(FakeClass) === false)
    assert(isInt8Array(new RegExp('abc')) === false)
    assert(isInt8Array(new RegExp(/abc/)) === false)
    assert(isInt8Array(new Int8Array()) === true)

  }

  testIsArrayBuffer() {
    assert(isArrayBuffer(undefined) === false)
    assert(isArrayBuffer(0) === false)
    assert(isArrayBuffer(1) === false)
    assert(isArrayBuffer([]) === false)
    assert(isArrayBuffer(null) === false)
    assert(isArrayBuffer('key') === false)
    assert(isArrayBuffer('') === false)
    assert(isArrayBuffer(true) === false)
    assert(isArrayBuffer(false) === false)
    assert(isArrayBuffer(NaN) === false)
    assert(isArrayBuffer({}) === false)
    assert(isArrayBuffer({'key': 1}) === false)
    assert(isArrayBuffer(Symbol('desc')) === false)
    assert(isArrayBuffer(() => {
    }) === false)
    assert(isArrayBuffer(FakeClass) === false)
    assert(isArrayBuffer(new RegExp('abc')) === false)
    assert(isArrayBuffer(new RegExp(/abc/)) === false)
    assert(isArrayBuffer(new ArrayBuffer()) === true)

  }
}


runTest(TestIs)
