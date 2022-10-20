/* global runTest */
import '../../package'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ObjectArray} from "../js/arrays/ObjectArray";
import {globalFlexioImport} from '../../../global-import-registry'

const assert = require('assert')

class TestObjectArray extends TestCase {
  debug = true

  testToJson() {
    const a = new ObjectArray(
      globalFlexioImport.io.flexio.flex_types.ObjectValue.fromObject({
        toto: 'tutu',
        number: 12
      }).build(),
      globalFlexioImport.io.flexio.flex_types.ObjectValue.fromObject({
        toto: 'tutu',
        number: 12
      }).build(),
    )
    const a_json = JSON.stringify(a)
    this.log(a_json)
    assert.ok(a_json === '[{\"toto\":\"tutu\",\"number\":12},{\"toto\":\"tutu\",\"number\":12}]', 'should be serialized')
  }

  testFromJson() {
    const a = new ObjectArray(
      globalFlexioImport.io.flexio.flex_types.ObjectValue.fromObject({
        toto: 'tutu',
        number: 12
      }).build(),
      globalFlexioImport.io.flexio.flex_types.ObjectValue.fromObject({
        toto: 'tutu',
        number: 12
      }).build(),
    )
    const a_json = JSON.stringify(a)

    const b = ObjectArray.fromJson(a_json).build()
    this.log(b)

    assert.ok(a.equals(b), 'should pass JSON encode and decode')
  }
}


runTest(TestObjectArray)
