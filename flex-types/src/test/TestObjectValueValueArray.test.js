/* global runTest */
import '../../package.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ObjectValueValueArray} from '../js/ObjectValue.js'

const assert = require('assert')

export class TestObjectValueValueArray extends TestCase {
  testMapEmpty() {
    const array = new ObjectValueValueArray()

    const result = array.map(e => e)

    assert.ok(result instanceof ObjectValueValueArray)
    assert.equal(result.length, 0)
  }

  testMapOne() {
    const array = new ObjectValueValueArray(5)

    const result = array.map(e => e)

    assert.ok(result instanceof ObjectValueValueArray)
    assert.equal(result.length, 1)
    assert.equal(result.get(0), 5)
  }

  testMapSeveral() {
    const array = new ObjectValueValueArray(2, 4, 6)

    const result = array.map(e => e * 2)

    assert.ok(result instanceof ObjectValueValueArray)
    assert.equal(result.length, 3)
    assert.equal(result.get(0), 4)
    assert.equal(result.get(1), 8)
    assert.equal(result.get(2), 12)

    assert.equal(array.length, 3, 'Original array is not mutated')
    assert.equal(array.get(0), 2)
    assert.equal(array.get(1), 4)
    assert.equal(array.get(2), 6)
  }

  testFilter() {
    const array = new ObjectValueValueArray(1, 2, 3)

    const result = array.filter(e => e % 2 === 0)

    assert.ok(result instanceof ObjectValueValueArray)
    assert.equal(result.length, 1)
    assert.equal(result.get(0), 2)
  }

  testConcat() {
    const array1 = new ObjectValueValueArray(1, 2)
    const array2 = new ObjectValueValueArray(3)

    const result = array1.concat(array2)

    assert.ok(result instanceof ObjectValueValueArray)
    assert.equal(result.length, 3)
    assert.equal(result.get(0), 1)
    assert.equal(result.get(1), 2)
    assert.equal(result.get(2), 3)

    assert.equal(array1.length, 2, 'Original array is not mutated')
    assert.equal(array1.get(0), 1)
    assert.equal(array1.get(1), 2)
    assert.equal(array2.length, 1, 'Additional array is not mutated')
    assert.equal(array2.get(0), 3)
  }

  testSlice() {
    const array = new ObjectValueValueArray(1, 2, 3)

    const fullSlice = array.slice()
    assert.ok(fullSlice instanceof ObjectValueValueArray)
    assert.equal(fullSlice.length, 3)
    assert.equal(fullSlice.get(0), 1)
    assert.equal(fullSlice.get(1), 2)
    assert.equal(fullSlice.get(2), 3)

    const startSlice = array.slice(0, 2)
    assert.ok(startSlice instanceof ObjectValueValueArray)
    assert.equal(startSlice.length, 2)
    assert.equal(startSlice.get(0), 1)
    assert.equal(startSlice.get(1), 2)

    const endSlice = array.slice(1, 3)
    assert.ok(endSlice instanceof ObjectValueValueArray)
    assert.equal(endSlice.length, 2)
    assert.equal(endSlice.get(0), 2)
    assert.equal(endSlice.get(1), 3)

    assert.equal(array.length, 3, 'Original array is not mutated')
  }
}

runTest(TestObjectValueValueArray)
