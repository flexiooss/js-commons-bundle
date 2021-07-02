/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {StringValidator} from '../js/Validator/StringValidator'
import '../js/__import__flex-types'
import {globalFlexioImport} from '../js/__import__global-import-registry'


const assert = require('assert')


export class StringValidatorTest extends TestCase {
  setUp() {
    this.validator = new StringValidator()
  }

  testValidateNotNull() {

    assert.ok(this.validator.validateNotNull(''))
    assert.ok(this.validator.validateNotNull('toto'))
    assert.ok(this.validator.validateNotNull(null) === false)
    assert.ok(this.validator.validateNotNull({}) === false)
    assert.ok(this.validator.validateNotNull(5) === false)
  }

  testValidateNotEmpty() {

    assert.ok(this.validator.validateNotEmpty('toto'))
    assert.ok(this.validator.validateNotEmpty('') === false)
    assert.ok(this.validator.validateNotEmpty(null) === false)
    assert.ok(this.validator.validateNotEmpty({}) === false)
    assert.ok(this.validator.validateNotEmpty(5) === false)
  }

  testValidateInRange() {

    assert.ok(this.validator.validateInRange('b', 'a', 'b'))
    assert.ok(this.validator.validateInRange('coucou', 'bibi', 'dudu'))
    assert.ok(this.validator.validateInRange('a', 'b', 'c') === false)
    assert.ok(this.validator.validateInRange('bibi', 'coucou', 'dudu') === false)
    assert.ok(this.validator.validateInRange(null))
    assert.ok(this.validator.validateInRange(null, 'a', 'b'))
    assert.ok(this.validator.validateInRange({}, 'a', 'b') === false)
    assert.ok(this.validator.validateInRange(5, 'a', 'b') === false)
  }

  testValidateInEnumerated() {

    assert.ok(this.validator.validateInEnumerated(
      'toto',
      new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(...['toto', 'tutu'])
      )
    )

    assert.ok(
      this.validator.validateInEnumerated(
        'titi',
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray(...['toto', 'tutu'])
      ) === false
    )

    assert.ok(
      this.validator.validateInEnumerated(
        'titi',
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      ) === false
    )

    assert.ok(
      this.validator.validateInEnumerated(
        '',
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      ) === false
    )

    assert.ok(
      this.validator.validateInEnumerated(
        null,
        new globalFlexioImport.io.flexio.flex_types.arrays
          .StringArray()
      )
    )

  }

  testValidateRegex() {
    assert(
      this.validator.validateRegex('toto', new RegExp(/o/))
    )

    assert(
      this.validator.validateRegex('toto', 'o') === false
    )

    assert(
      this.validator.validateRegex('https://ui.toto.fr/', new RegExp(/\/$/))
    )

    assert(
      this.validator.validateRegex('', new RegExp())
    )
    assert(
      this.validator.validateRegex(' ', new RegExp())
    )
    assert(
      this.validator.validateRegex('', new RegExp(/ /)) === false
    )

    assert(
      this.validator.validateRegex('https://ui.toto.fr/', new RegExp(/^$/)) === false
    )

    assert(
      this.validator.validateRegex('toto', new RegExp(/a/)) === false
    )

    assert(
      this.validator.validateRegex(null, new RegExp()) === true
    )
    assert(
      this.validator.validateRegex(null, '') === true
    )

  }
}


runTest(StringValidatorTest)
