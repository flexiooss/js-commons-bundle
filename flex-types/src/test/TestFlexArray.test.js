/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexArray} from '../../src/js/FlexArray'
import {assertType, isBoolean, isNull, isNumber} from '../js/__import__assert'


const assert = require('assert')


class TestArray extends FlexArray {
  _validate(e) {
    if (!isNull(e)) {
      assertType(isBoolean(e), '`e` should be a bool')
    }
  }
}


class TestArrayNumber extends FlexArray {
  _validate(e) {
    if (!isNull(e)) {
      assertType(isNumber(e), '`e` should be a number')
    }
  }
}


export class TestFlexArray extends TestCase {
  testEmpty() {
    let a = new TestArray()
    assert.throws(() => {
      a.get(8)
    })

  }

  testGet() {
    let a = new TestArrayNumber(10, 20, 30)

    assert(a.first() === 10)
    assert(a.get(1) === 20)
    assert(a.last() === 30)
  }

  testFilter() {
    let a = new TestArray(true, false, true)
    let res = a.filter((v) => !!v)
    assert.deepStrictEqual(res, new TestArray(true, true))
  }

  testSlice() {
    let a = new TestArrayNumber(1, 2, 3, 4, 5, 6)
    assert.deepStrictEqual(
      a.slice(),
      new TestArrayNumber(1, 2, 3, 4, 5, 6),
      'simple slice should give full array'
    )
    assert.deepStrictEqual(
      a.slice(2),
      new TestArrayNumber(3, 4, 5, 6),
      'slice 2 should give array without 2 first items'
    )

    assert.deepStrictEqual(
      a.slice(2, 3),
      new TestArrayNumber(3),
      'slice 3 should give array without 3 first items'
    )

    assert.deepStrictEqual(
      a.slice(2, -1),
      new TestArrayNumber(3, 4, 5),
      'slice (2,-1) should give array without 2 first items and without last item'
    )
    assert.deepStrictEqual(
      a.slice(-42),
      new TestArrayNumber(1, 2, 3, 4, 5, 6),
      'slice -42 should give full array'
    )
    assert.deepStrictEqual(
      a.slice(42),
      new TestArrayNumber(),
      'slice 42 should give empty array'
    )
    assert.deepStrictEqual(
      a.slice(-1),
      new TestArrayNumber(6),
      'slice -1 should give array with last item'
    )
    assert.deepStrictEqual(
      new TestArrayNumber().slice(1),
      new TestArrayNumber(),
      'slice 1 for empty array should give empty array'
    )
    assert.deepStrictEqual(
      new TestArrayNumber().slice(-1),
      new TestArrayNumber(),
      'slice -1 for empty array should give empty array'
    )
    assert.throws(() => {
      a.slice(2, 1)
    })
  }

  testFreeze() {

    const a = new TestArrayNumber(1, 2, 3)
    a.push(4)
    a.freeze()
    assert.throws(() => {
      a.push(5)
    })

    assert.throws(() => {
      a.shift()
    })

    assert.throws(() => {
      a.unshift(8)
    })

    a.find(v => v === 2)

  }
}


runTest(TestFlexArray)
