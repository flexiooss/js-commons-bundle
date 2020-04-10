/* global runTest */
import {TestCase} from 'code-altimeter-js'
import '../js/__import__flex-types'
import {PhoneNumberValidator} from '../js/Validator/PhoneNumberValidator'

const assert = require('assert')

export class StringValidatorTest extends TestCase {
  setUp() {
    this.validator = new PhoneNumberValidator()
  }

  testValidateType() {
    assert.ok(this.validator.validateType(null)) // test nullable
    assert.ok(!this.validator.validateType(5)) // test type
    // assert.ok(!this.validator.validateType('toto')) // test regex
     assert.ok(!this.validator.validateType('+')) // test regex
     assert.ok(this.validator.validateType('+33')) // test regex
    assert.ok(this.validator.validateType('+33312345678901234')) // test regex 3 + 14 digits
    assert.ok(!this.validator.validateType('+333123456789012345')) // test regex 3 + 15 digits
  }

  testValidateNotNull() {
    assert.ok(this.validator.validateNotNull('') === false)
    assert.ok(this.validator.validateNotNull(null) === false)
    assert.ok(this.validator.validateNotNull({}) === false)
    assert.ok(this.validator.validateNotNull(5) === false)
  }

  testValidateNotEmpty() {
    assert.ok(this.validator.validateNotEmpty('+3350505050'))
    assert.ok(this.validator.validateNotEmpty('') === false)
    assert.ok(this.validator.validateNotEmpty(null) === false)
    assert.ok(this.validator.validateNotEmpty({}) === false)
    assert.ok(this.validator.validateNotEmpty(5) === false)
  }
}

runTest(StringValidatorTest)
