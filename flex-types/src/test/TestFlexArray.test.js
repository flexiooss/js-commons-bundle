/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {FlexArray} from '../../src/js/FlexArray'
import {assertType, isBoolean, isNull, isNumber} from '@flexio-oss/assert'


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
      new TestArrayNumber(1, 2, 3, 4, 5, 6)
    )
    assert.deepStrictEqual(
      a.slice(2),
      new TestArrayNumber(3, 4, 5, 6)
    )

    assert.deepStrictEqual(
      a.slice(2, 3),
      new TestArrayNumber(3)
    )

    assert.deepStrictEqual(
      a.slice(2, -1),
      new TestArrayNumber(3, 4, 5)
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
