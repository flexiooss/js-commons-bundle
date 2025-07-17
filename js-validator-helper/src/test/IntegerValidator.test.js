/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import '../js/__import__flex-types.js'
import {globalFlexioImport} from '../js/__import__global-import-registry.js'
import {IntegerValidator} from '../js/Validator/IntegerValidator.js'


const assert = require('assert')


export class IntegerValidatorTest extends TestCase {
  setUp() {
    this.validator = new IntegerValidator()
  }

  testValidateNotNull() {

    assert.ok(this.validator.validateNotNull(0))
    assert.ok(this.validator.validateNotNull(0.85) === false)
    assert.ok(this.validator.validateNotNull(-5))
    assert.ok(this.validator.validateNotNull(null) === false)
    assert.ok(this.validator.validateNotNull('') === false)
    assert.ok(this.validator.validateNotNull('5') === false)
  }

  testValidateNotEmpty() {

    assert.ok(this.validator.validateNotEmpty(0))
    assert.ok(this.validator.validateNotEmpty(0.85) === false)
    assert.ok(this.validator.validateNotEmpty(-5))
    assert.ok(this.validator.validateNotEmpty(null) === false)
    assert.ok(this.validator.validateNotEmpty('') === false)
    assert.ok(this.validator.validateNotEmpty('5') === false)
  }

  testValidateInRange() {

    assert.ok(this.validator.validateInRange(2, 1, 3))
    assert.ok(this.validator.validateInRange(0.85, 0.8, 3.3) === false)
    assert.ok(this.validator.validateInRange(0.85, 0.9, 3.3) === false)
    assert.ok(this.validator.validateInRange(1, 0.8, 3.3))
    assert.ok(this.validator.validateInRange(2, '1', '3'))
    assert.ok(this.validator.validateInRange(0, -1, 1))
    assert.ok(this.validator.validateInRange(0, 0, 1))
    assert.ok(this.validator.validateInRange(0, 1, 2) === false)
    assert.ok(this.validator.validateInRange('bibi', 1, 3) === false)
    assert.ok(this.validator.validateInRange(null))
    assert.ok(this.validator.validateInRange(null, 2, 4))
    assert.ok(this.validator.validateInRange({}, 0, 4) === false)
    assert.ok(this.validator.validateInRange(5, 'a', 'b') === false)
    assert.ok(this.validator.validateInRange(2, 0, null))
    assert.ok(this.validator.validateInRange(2, null, 10))
    assert.ok(this.validator.validateInRange(null, null, null))

  }

  testValidateInEnumerated() {

    assert.ok(this.validator.validateInEnumerated(
      4,
      new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(...['1', '4'])
      ), '1'
    )

    assert.ok(this.validator.validateInEnumerated(
      2,
      new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(...['2'])
      ),
      '2.a'
    )

    assert.ok(this.validator.validateInEnumerated(
      0,
      new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(...['0'])
      ),
      '2.b'
    )

    assert.ok(
      this.validator.validateInEnumerated(
        0,
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray(...['1', '2'])
      ) === false,
      '3'
    )

    assert.ok(
      this.validator.validateInEnumerated(
        2,
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      ) === false,
      '4'
    )

    assert.ok(
      this.validator.validateInEnumerated(
        '',
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      ) === false,
      '5'
    )

    assert.ok(
      this.validator.validateInEnumerated(
        null,
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      ),
      '6'
    )

  }

  testValidateRegex() {
    assert.throws(() => {
        this.validator.validateRegex('toto', '')
      }
    )

  }
}


runTest(IntegerValidatorTest)
