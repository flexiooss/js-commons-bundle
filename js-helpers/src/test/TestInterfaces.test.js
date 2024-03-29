import {TestCase} from '@flexio-oss/code-altimeter-js'
import {bibiInterface, implementsBibi} from './BibiInterface.js'
import {bubuInterface, implementsBubu} from './BubuInterface.js'


const assert = require('assert')


class Truc {
  /**
   *
   * @param {*} value
   */
  ab(value) {
  }

  /**
   *
   * @return {ChangeableFormFieldViewEvent}
   */
  cd() {
  }
}


/**
 *
 * @implements {BubuInterface}, {BibiInterface}
 */
class Toto extends bibiInterface(bubuInterface(Truc)) {

}


export class TestInterfaces extends TestCase {
  setUp() {
    this.toto = new Toto()
  }

  testImplementsBubu() {
    assert.ok(implementsBubu(this.toto),'implementsBubu')
  }
  testImplementsBibi() {
    assert.ok(implementsBibi(this.toto),'implementsBibi')
  }
  testExtends() {
    assert.throws(()=>{
      this.toto.on()
    })
  }
}


runTest(TestInterfaces)
