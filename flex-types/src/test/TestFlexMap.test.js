/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {FlexMap} from '../js/FlexMap'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'

const assert = require('assert')

class TestMap extends FlexMap {
  _validate(e) {

  }
}

export class TestFlexMap extends TestCase {
  testEmpty() {
    let map = new TestMap()
    assert.strictEqual(map.get(8), null)
  }

  testItem() {
    let map = new TestMap()
    map.set(8, 9)
    assert.strictEqual(map.get(8), 9)
  }

  testDeepFreezeAdd() {
    let map = new TestMap()
    map.set(8, 9)
    deepFreezeSeal(map)
    map.with(9, 10)
    assert.strictEqual(map.get(9), null)
    map = map.with(9, 10)
    assert.strictEqual(map.get(9), 10)
  }

  testDeepFreezeDelete() {
    let map = new TestMap()
    map.set(8, 9)
    deepFreezeSeal(map)
    map.without(8)
    assert.strictEqual(map.get(8), 9)
    map = map.without(8)
    assert.strictEqual(map.get(8), null)
  }
}

runTest(TestFlexMap)
