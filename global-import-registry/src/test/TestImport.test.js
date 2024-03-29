import {TestCase} from '@flexio-oss/code-altimeter-js'
import {globalFlexioImport,globalScope,FLEXIO_IMPORT_OBJECT} from '../js/import.js'

const assert = require('assert')

export class TestImport extends TestCase {

  testImport() {
    assert(globalFlexioImport === globalScope[FLEXIO_IMPORT_OBJECT])
  }

}

runTest(TestImport)
