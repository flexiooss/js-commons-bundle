/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {GeolocValidator, LATITUDE_PROPERTY, LONGITUDE_PROPERTY} from '../js/Validator/GeolocValidator.js'
import {ObjectValue} from '../js/__import__flex-types.js'

const assert = require('assert')

export class GeolocValidatorTest extends TestCase {
  setUp() {
    this.validator = new GeolocValidator()
  }

  testValidateNotNull() {
    assert.ok(this.validator.validateNotNull(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).numberValue(LONGITUDE_PROPERTY, 5).build()))
    assert.ok(this.validator.validateNotNull(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, null).numberValue(LONGITUDE_PROPERTY, 5).build()) === false)
    assert.ok(this.validator.validateNotNull(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).numberValue(LONGITUDE_PROPERTY, null).build()) === false)
    assert.ok(this.validator.validateNotNull(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).build()) === false)
    assert.ok(this.validator.validateNotNull(ObjectValue.builder().numberValue(LONGITUDE_PROPERTY, null).build()) === false)
  }

  testValidateType() {
    assert.ok(this.validator.validateType(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).numberValue(LONGITUDE_PROPERTY, 5).build()))
    assert.ok(this.validator.validateType(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, null).numberValue(LONGITUDE_PROPERTY, 5).build()))
    assert.ok(this.validator.validateType(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).numberValue(LONGITUDE_PROPERTY, null).build()))
    assert.ok(this.validator.validateType(ObjectValue.builder().numberValue(LATITUDE_PROPERTY, 5).build()) === false)
    assert.ok(this.validator.validateType(ObjectValue.builder().numberValue(LONGITUDE_PROPERTY, null).build()) === false)
  }
}

runTest(GeolocValidatorTest)
