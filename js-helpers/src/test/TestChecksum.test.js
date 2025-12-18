import {TestCase} from '@flexio-oss/code-altimeter-js'
import {Checksum} from '../js/Checksum.js'
import {bigText} from "./bigText.js";

const assert = require('assert')

export class TestChecksumTest extends TestCase {
  debug = true

  test32bit() {

    const res2 = Checksum.simpleHash(bigText)
    this.log(res2)
    assert.ok(res2 == "4259835d")
  }
  testSimple() {

    const res2 = Checksum.simpleHash(bigText)
    this.log(res2)
    assert.ok(res2 == "4259835d")
  }
  // async asyncTestSha(){
  //   return new Promise(async (ok,ko)=>{
  //     const res = await Checksum.hash(bigText)
  //     this.log(res)
  //     ok()
  //   })
  // }
  // async asyncTestFile(){
  //   return new Promise(async (ok,ko)=>{
  //     const res = await Checksum.hashFile(new File([bigText], "test.txt", {
  //       type: "text/plain",
  //     }))
  //     this.log(res)
  //     ok()
  //   })
  // }

}

runTest(TestChecksumTest)
