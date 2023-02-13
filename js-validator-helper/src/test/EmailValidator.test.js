/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import '../js/__import__flex-types.js'
import {EmailValidator} from '../js/Validator/EmailValidator.js'

const assert = require('assert')

export class StringValidatorTest extends TestCase {
  setUp() {
    this.validator = new EmailValidator()
  }

  testValidateType() {
    assert.ok(this.validator.validateType(null)) // test nullable
    assert.ok(!this.validator.validateType(5)) // test type
    assert.ok(!this.validator.validateType('toto')) // test regex
    assert.ok(!this.validator.validateType('toto@')) // test regex
    assert.ok(this.validator.validateType('toto@test')) // test regex
    assert.ok(!this.validator.validateType('toto@test.')) // test regex
    assert.ok(this.validator.validateType('toto@test.fr')) // test regex
    assert.ok(!this.validator.validateType('@test.fr')) // test regex
    assert.ok(!this.validator.validateType('test.fr')) // test regex
    assert.ok(this.validator.validateType('toto.titi@test.fr')) // test regex
  }

  testValidateNotNull() {
    assert.ok(this.validator.validateNotNull('') === false)
    assert.ok(this.validator.validateNotNull(null) === false)
    assert.ok(this.validator.validateNotNull({}) === false)
    assert.ok(this.validator.validateNotNull(5) === false)
  }

  testValidateNotEmpty() {
    assert.ok(this.validator.validateNotEmpty('toto@test.this'))
    assert.ok(this.validator.validateNotEmpty('') === false)
    assert.ok(this.validator.validateNotEmpty(null) === false)
    assert.ok(this.validator.validateNotEmpty({}) === false)
    assert.ok(this.validator.validateNotEmpty(5) === false)
  }
}

runTest(StringValidatorTest)
