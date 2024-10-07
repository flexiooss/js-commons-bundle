import {TestCase} from '@flexio-oss/code-altimeter-js'
import {UID, UIDMini} from '../js/uid.js'

const assert = require('assert')

export class TestUIDTest extends TestCase {
  debug = false

  testUID() {

    const uidPrefix = UID('toto');
    const uid = UID();
    const uidMiniPrefix = UIDMini('toto');
    const uidMini = UIDMini();

    this.log(uidPrefix, 'uidPrefix')
    this.log(uid, 'uid')
    this.log(uidMiniPrefix, 'uidMiniPrefix')
    this.log(uidMini, 'uidMini')

    assert.ok(
      uidPrefix.startsWith('toto'), 'uidPrefix'
    )
    assert.ok(
      uid !== '' && uid !== null, 'uid'
    )
    assert.ok(
      uidMini !== '' && uidMini !== null, 'uidMini'
    )
    assert.ok(
      uidMiniPrefix.startsWith('toto'), 'uidMiniPrefix'
    )
  }

}

runTest(TestUIDTest)
