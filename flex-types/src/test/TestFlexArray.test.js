/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexArray} from '../../src/js/FlexArray.js'
import {assertType, isBoolean, isNull, isNumber} from '../js/__import__assert.js'
import {IntegerArray} from "../js/arrays/IntegerArray.js";

const assert = require('assert')

class TestBoolArray extends FlexArray {
  _validate(e) {
    if (!isNull(e)) {
      assertType(isBoolean(e), '`e` should be a bool')
    }
  }
}

export class TestFlexArray extends TestCase {
  testEmpty() {
    let a = new TestBoolArray()
    assert.throws(() => {
      a.get(8)
    })

  }

  testGet() {
    let a = new IntegerArray(10, 20, 30)

    assert(a.first() === 10)
    assert(a.get(1) === 20)
    assert(a.last() === 30)
  }

  testFilter() {
    let a = new TestBoolArray(true, false, true)
    let res = a.filter((v) => !!v)
    assert.deepStrictEqual(res, new TestBoolArray(true, true))
  }

  testSlice() {
    let a = new IntegerArray(1, 2, 3, 4, 5, 6)
    assert.deepStrictEqual(
      a.slice(),
      new IntegerArray(1, 2, 3, 4, 5, 6),
      'simple slice should give full array'
    )
    assert.deepStrictEqual(
      a.slice(2),
      new IntegerArray(3, 4, 5, 6),
      'slice 2 should give array without 2 first items'
    )

    assert.deepStrictEqual(
      a.slice(2, 3),
      new IntegerArray(3),
      'slice 3 should give array without 3 first items'
    )

    assert.deepStrictEqual(
      a.slice(2, -1),
      new IntegerArray(3, 4, 5),
      'slice (2,-1) should give array without 2 first items and without last item'
    )
    assert.deepStrictEqual(
      a.slice(-42),
      new IntegerArray(1, 2, 3, 4, 5, 6),
      'slice -42 should give full array'
    )
    assert.deepStrictEqual(
      a.slice(42),
      new IntegerArray(),
      'slice 42 should give empty array'
    )
    assert.deepStrictEqual(
      a.slice(-1),
      new IntegerArray(6),
      'slice -1 should give array with last item'
    )
    assert.deepStrictEqual(
      new IntegerArray().slice(1),
      new IntegerArray(),
      'slice 1 for empty array should give empty array'
    )
    assert.deepStrictEqual(
      new IntegerArray().slice(-1),
      new IntegerArray(),
      'slice -1 for empty array should give empty array'
    )
    assert.throws(() => {
      a.slice(2, 1)
    })
  }

  testFreeze() {

    const a = new IntegerArray(1, 2, 3)
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

  testMap(){
    const a = new IntegerArray(1, 2, 3)
    const a_expected = new IntegerArray(3,4,5)

    const res_a = a.map(value => value +2)
    assert.deepEqual(res_a, a_expected)
    assert.ok(res_a instanceof IntegerArray)
    const b = new TestBoolArray(true, false, true)
    const b_expected = new TestBoolArray(false, true, false)
    const res_b = b.map(value => !value)
    assert.deepEqual(res_b, b_expected)
    assert.ok(res_b.length === b.length)
    assert.ok(res_b instanceof TestBoolArray)
  }

  testEquals(){
    const a = new IntegerArray(2,4,6,8)
    assert.ok(a.equals(new IntegerArray(2,4,6,8)), 'primitive array should be equals')
    assert.ok(!a.equals(new IntegerArray(2,4,6,8,10)), 'primitive array should not be equals')
  }


  testPush(){
    const a = new IntegerArray(2,4,6,8)
    const b = a.withPush(10)
    assert.ok(b.equals(new IntegerArray(2,4,6,8,10)), 'primitive array should be equals')
    const c = a.withPush(...[10,12,14])
    assert.ok(c.equals(new IntegerArray(2,4,6,8,10,12,14)), 'primitive array with multiple push should be equals')
    const d = a.withPush(...new IntegerArray(10,12,14))
    assert.ok(d.equals(new IntegerArray(2,4,6,8,10,12,14)), 'flexarray with multiple push should be equals')
  }
}


runTest(TestFlexArray)
