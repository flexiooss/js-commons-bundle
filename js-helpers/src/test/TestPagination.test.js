import {TestCase} from '@flexio-oss/code-altimeter-js'
import {PaginationHelper} from '../js/PaginationHelper.js'
import {ContentRangeHelper} from '../js/ContentRangeHelper.js'

const assert = require('assert')

export class TestPaginationTest extends TestCase {
  testRangeMin() {
    assert.deepStrictEqual(PaginationHelper.rangeMin(0, 0), 0)
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
    assert.deepStrictEqual(PaginationHelper.rangeMax(0, 0), 0)
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

  testContentRange() {
    assert.deepStrictEqual(ContentRangeHelper.getTotal('0-100/521'), 521)
  }

  testContentRangeMin() {
    assert.deepStrictEqual(ContentRangeHelper.getRangeMin('0-100/521'), 0)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMin('Toto 0-5/5'), 0)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMin('Toto lulu-tata 06-5/5'), 6)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMin('Toto lulu-tata 06--5/5'), null)
  }

  testContentRangeMax() {
    assert.deepStrictEqual(ContentRangeHelper.getRangeMax('0-100/521'), 100)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMax('Toto 0-5/5'), 5)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMax('Toto lulu-tata 6-05/5'), 5)
    assert.deepStrictEqual(ContentRangeHelper.getRangeMax('Toto lulu-tata 06--5/5'), null)
  }
}

runTest(TestPaginationTest)
