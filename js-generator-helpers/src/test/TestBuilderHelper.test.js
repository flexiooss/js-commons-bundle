import {TestCase} from '@flexio-oss/code-altimeter-js'
import {builder, BuilderHelper, haveBuilder} from '../..'
import {isNull} from '../../../assert'


const assert = require('assert')


export class TestObjectHelpers extends TestCase {
  testConsumeLambda() {
    const value = builder => builder
    const object = BuilderHelper.consume(value, Test, 'Test')
    assert.ok(object instanceof Test)
  }

  testConsume() {
    const value = new Test()
    const object = BuilderHelper.consume(value, Test, 'Test')
    assert.ok(object instanceof Test)
  }

  testConsumeNullSetEmpty() {
    const value = null
    const object = BuilderHelper.consume(value, Test, 'Test', false)
    assert.ok(object instanceof Test)
  }

  testConsumeNull() {
    const value = null
    const object = BuilderHelper.consume(value, Test, 'Test', true)
    assert.ok(isNull(object))
  }
}

class Test extends haveBuilder() {
  static builder() {
    return new TestBuilder()
  }
}

class TestBuilder extends builder() {
  build() {
    return new Test()
  }
}


runTest(TestObjectHelpers)
