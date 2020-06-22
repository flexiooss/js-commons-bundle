/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {FlexRegExp, FlexRegExpBuilder} from '../js/FlexRegExp'

const assert = require('assert')

export class TestFlexRegexp extends TestCase {
  testEncodeSimple() {
    const a = new FlexRegExpBuilder()
      .value(new RegExp('^abc'))
      .build()

    assert.throws(() => {
      new FlexRegExpBuilder()
        .value('abc')
        .build()
    })

    assert.strictEqual(JSON.stringify(a), '{"value":"/^abc/"}')

    assert.deepEqual(JSON.parse(JSON.stringify(a)), {"value":"/^abc/"})
  }

  testEncodeDecodeSimple() {
    const a = new FlexRegExpBuilder()
      .value(new RegExp('^abc'))
      .build()

    const b = FlexRegExpBuilder.fromJson(JSON.stringify(a)).build()

    assert.deepEqual(a, b)
  }

  testEncodeComplex() {
    const a = new FlexRegExpBuilder()
      .value(new RegExp('^abc', 'g'))
      .build()

    assert.strictEqual(JSON.stringify(a), '{"value":"/^abc/g"}')

    assert.deepEqual(JSON.parse(JSON.stringify(a)), {"value":"/^abc/g"})
  }

  testEncodeDecodeComplex() {
    const a = new FlexRegExpBuilder()
      .value(new RegExp('^abc', 'g'))
      .build()

    const b = FlexRegExpBuilder.fromJson(JSON.stringify(a)).build()

    assert.deepEqual(b, a)
  }
}

runTest(TestFlexRegexp)
