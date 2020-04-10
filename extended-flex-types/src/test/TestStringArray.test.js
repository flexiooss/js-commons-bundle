/* global runTest */
import {StringArray, StringArrayBuilder} from '../js/FlexArray/StringArray'
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

export class TestStringArray extends TestCase {
  testRaiseType() {
    const a = new StringArray()
    assert.throws(() => {
      a.push({})
    })
  }

  testStringOk() {
    const a = new StringArray()
    a.push('toto')
    assert(a.get(0) === 'toto')
  }

  testWith() {
    const a = new StringArrayBuilder().build()
    const b = a.with(['a', 'b'])

    assert.deepStrictEqual(
      b,
      new StringArrayBuilder()
        .values(['a', 'b'])
        .build()
    )
    assert(a !== b)
  }

  testWithPush() {
    const a = new StringArrayBuilder()
      .values(['a', 'b'])
      .build()
    const b = a.withPush(['c', 'd'])

    assert.deepStrictEqual(
      b,
      new StringArrayBuilder()
        .values(['a', 'b', 'c', 'd'])
        .build()
    )

    assert(a !== b)
  }
}

//runTest(TestStringArray)
