/* global runTest */
import '../../package.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {StringArray} from "../js/arrays/StringArray.js";

const assert = require('assert')

class TestStringArray extends TestCase {
  debug = true

  testToJson() {
    const a = new StringArray(
     'toto', 'tutu'
    )
    const a_json = JSON.stringify(a)
    this.log(a_json)
    assert.ok(a_json === '[\"toto\",\"tutu\"]', 'should be serialized')
  }

  testFromJson() {
    const a = new StringArray(
      'toto', 'tutu'
    )
    const a_json = JSON.stringify(a)

    const b = StringArray.fromJson(a_json).build()
    this.log(b)

    assert.ok(a.equals(b), 'should pass JSON encode and decode')
  }
}


runTest(TestStringArray)
