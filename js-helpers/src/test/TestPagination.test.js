import {TestCase} from '@flexio-oss/code-altimeter-js'
import {Sequence} from "../js/Sequence";
import {PaginationHelper} from '../js/PaginationHelper'

const assert = require('assert')

export class TestPaginationTest extends TestCase {
  testRangeMin() {
    assert.deepStrictEqual(PaginationHelper.rangeMin(0, 100), 0)
    assert.deepStrictEqual(PaginationHelper.rangeMin(0, 100, 5), 5)
    assert.deepStrictEqual(PaginationHelper.rangeMin(1, 55), 55)
    assert.deepStrictEqual(PaginationHelper.rangeMin(1, 55, 5), 60)


    assert.deepStrictEqual(PaginationHelper.printedRangeMin(0,0, 100), 0)
    assert.deepStrictEqual(PaginationHelper.printedRangeMin(0, 0, 100, 5), 0)
    assert.deepStrictEqual(PaginationHelper.printedRangeMin(40, 1, 55), 40)
    assert.deepStrictEqual(PaginationHelper.printedRangeMin(100, 1, 55), 56)
  }

  testRangeMax() {
    assert.deepStrictEqual(PaginationHelper.rangeMax(0, 100), 99)
    assert.deepStrictEqual(PaginationHelper.rangeMax(0, 100, 5), 104)
    assert.deepStrictEqual(PaginationHelper.rangeMax(1, 55), 109)
    assert.deepStrictEqual(PaginationHelper.rangeMax(1, 55, 5), 114)


    assert.deepStrictEqual(PaginationHelper.printedRangeMax(0,0, 100), 0)
    assert.deepStrictEqual(PaginationHelper.printedRangeMax(0, 0, 100, 5), 0)
    assert.deepStrictEqual(PaginationHelper.printedRangeMax(40, 1, 55), 40)
    assert.deepStrictEqual(PaginationHelper.printedRangeMax(100, 1, 55), 100)
  }

  testRange() {
    assert.deepStrictEqual(PaginationHelper.getRange(0,100, 0), '0-99')
    assert.deepStrictEqual(PaginationHelper.getRange(0,100, 0, (min, max) => `${max}@${min}`), '99@0')
  }
}

runTest(TestPaginationTest)
