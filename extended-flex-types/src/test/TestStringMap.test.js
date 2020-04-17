/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringMap, StringMapBuilder} from '../js/FlexMap/StringMap'

const assert = require('assert')

export class TestStringMap extends TestCase {
  testEncodeMap() {
    const a = new StringMap()
    assert.throws(() => {
      a.set(1, ['a'])
    })

    a.set(1, 'a')
    a.set(2, 'b')

    assert.strictEqual(JSON.stringify(a), '{"1":"a","2":"b"}')
    assert.deepEqual(JSON.parse(JSON.stringify(a)), {'1': 'a', '2': 'b'})
  }

  testEncodeDecodeMap() {
    const a = new StringMap()
    a.set(1, 'a')
    a.set(2, 'b')

    const sa = JSON.stringify(a)

    const b = StringMapBuilder.fromJson(sa).build()
    assert.deepEqual(a, b)
  }

  testBuilder() {
    const a = new StringMap()
    a.set('1', 'a')
    a.set('2', 'b')

    const b = new StringMapBuilder()
      .entries([['1', 'a'], ['2', 'b']])
      .build()

    assert.deepEqual(a, b)
  }

  testFromInstanceMap() {
    const a = new StringMapBuilder()
      .entries([['1', 'a'], ['2', 'b']])
      .build()

    const b = StringMapBuilder.from(a).build()

    assert.deepEqual(a, b)
  }
}

runTest(TestStringMap)
