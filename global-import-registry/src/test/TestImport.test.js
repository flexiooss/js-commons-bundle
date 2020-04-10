import {TestCase} from 'code-altimeter-js'
import {globalFlexioImport,globalScope,FLEXIO_IMPORT_OBJECT} from '../js/import'

const assert = require('assert')

export class TestImport extends TestCase {

  testImport() {
    assert(globalFlexioImport === globalScope[FLEXIO_IMPORT_OBJECT])
  }

}

runTest(TestImport)
