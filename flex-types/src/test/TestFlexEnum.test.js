/* global runTest */
import {FlexEnum} from '../js/FlexEnum.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {IndexError} from '../../src/js/IndexError.js'


const assert = require('assert')


class TestEnum1 extends FlexEnum {

}


class TestEnum2 extends FlexEnum {

}


class TestEnum3 extends FlexEnum {

}


class TestFlexEnum extends TestCase {

  testEmpty() {
    TestEnum1.initEnum([])
    assert.throws(() => {
      TestEnum1.fuckingAbsentValue.name()
    })
  }

  testGet() {
    TestEnum2.initEnum(['pat', 'ate'])

    assert.strictEqual(TestEnum2.pat.name(), 'pat')
    assert.strictEqual(TestEnum2.pat.ordinal(), 0)

    assert.strictEqual(TestEnum2.ate.name(), 'ate')
    assert.strictEqual(TestEnum2.ate.ordinal(), 1)
  }

  testValueOf() {
    TestEnum3.initEnum(['pat', 'ate'])
    let enumValue = TestEnum3.enumValueOf('pat')
    assert.strictEqual(enumValue.name(), 'pat')
    assert.strictEqual(enumValue.ordinal(), 0)

    enumValue = TestEnum3.enumValueOf('ate')
    assert.strictEqual(enumValue.name(), 'ate')
    assert.strictEqual(enumValue.ordinal(), 1)

    assert.throws(() => {
        TestEnum3.enumValueOf('fuckingAbsentValue')
      },
      IndexError)
  }
}


runTest(TestFlexEnum)
