/* global runTest */
import '../../package.js'
import {globalFlexioImport} from '../js/__import__global-import-registry.js'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ObjectValue, ObjectValueBuilder} from '../../src/js/ObjectValue.js'
import {IndexError} from '../js/IndexError.js'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from '../js/FlexDate.js'
import fixture_ob1 from './fixtures/_1.json'
import fixture_ob2 from './fixtures/_2.json'

const assert = require('assert')


const ob4 = ObjectValue
  .builder()
  .stringValue('string', null)
  .booleanValue('bool', true)
  .numberValue('number', 12)
  .arrayValue('array', ['tutu', true, 12])
  .build();

export class TestObjectValue extends TestCase {
  // debug = true

  testBuildAndGet() {

    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .stringValue('stringNull', null)
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', 'roro', 12])
      .flexDateTimeValue('dt', new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32'))
      .flexDateValue('d', new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17'))
      .flexTimeValue('t', new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527'))
      .flexZonedDateTimeValue('zdt', new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00'))
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob3 = ObjectValue
      .builder()
      .stringValue('string', 'titi')
      .stringValue('dt', '1992-12-17T04:17:32')
      .stringValue('d', '1992-10-17')
      .stringValue('t', '04:17:32.527')
      .stringValue('zdt', '1992-10-17T04:17:32+03:00')
      .booleanValue('bool', false)
      .numberValue('number', 42)
      .arrayValue('array', ['tutu', 'bibi', 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('primitiveArray', ['tutu', true, null, 12])
      .arrayValue('complexArray', [ob3, ['tutu', true, null, 12, ob]])
      .objectValueValue('object', ob)
      .build()

    assert.ok(ob.stringValue('string') === 'toto', 'stringValue')

    assert.ok(ob.stringValue('stringNull') === null, 'stringNull')

    assert.ok(ob.stringValueOr('BadKey', 'default') === 'default', 'stringValueOr with bad key')

    assert.ok(ob.stringValueOr('number', 'default') === 'default', 'stringValueOr with bad type')

    assert.ok(ob2.booleanValue('bool') === true, 'booleanValue')
    assert.ok(ob2.booleanValueOr('badKey', false) === false, 'booleanValueOr')

    assert.ok(ob.flexDateTimeValue('dt').equals(new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')), 'dateTime value')
    assert.ok(ob.flexDateTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')).equals(new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')), 'dateTime valueOr')

    assert.ok(ob.flexTimeValue('t').equals(new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')), 'Time value')
    assert.ok(ob.flexTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')).equals(new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')), 'Time valueOr')

    assert.ok(ob.flexDateValue('d').equals(new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')), 'date value')
    assert.ok(ob.flexDateValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')).equals(new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')), 'date valueOr')

    assert.ok(ob.flexZonedDateTimeValue('zdt').equals(new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')), 'zonedDateTime value')
    assert.ok(ob.flexZonedDateTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')).equals(new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')), 'zonedDateTime valueOr')


    assert.ok(ob3.flexDateTimeValue('dt').equals(new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')), 'cast dateTime value')
    assert.ok(ob3.flexDateTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')).equals(new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32')), 'cast  dateTime valueOr')

    assert.ok(ob3.flexTimeValue('t').equals(new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')), 'cast Time value')
    assert.ok(ob3.flexTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')).equals(new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527')), 'cast Time valueOr')

    assert.ok(ob3.flexDateValue('d').equals(new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')), 'cast date value')
    assert.ok(ob3.flexDateValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')).equals(new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17')), 'cast date valueOr')

    assert.ok(ob3.flexZonedDateTimeValue('zdt').equals(new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')), 'cast zonedDateTime value')
    assert.ok(ob3.flexZonedDateTimeValueOr('badKey', new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')).equals(new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00')), 'cast zonedDateTime valueOr')


    assert.ok(ob2.numberValue('number') === 12, 'numberValue')
    assert.ok(ob2.numberValueOr('badKey', 14) === 14, 'numberValueOr')

    assert.deepStrictEqual(ob2.arrayValue('primitiveArray').toArray(), ['tutu', true, null, 12], 'arrayValue')

    assert.deepStrictEqual(ob2.arrayValueOr('badKey', ['bad', 'bad', 12]).toArray(), ['bad', 'bad', 12], 'arrayValueOr')

    assert.deepStrictEqual(ob2.objectValueValue('object').toObject(), ob.toObject(), 'objectValueValue')
    assert.deepStrictEqual(ob2.objectValueValueOr('badKey', ob3).toObject(), ob3.toObject(), 'objectValueValueOr')
  }

  testBuilder() {

    assert.deepStrictEqual(
      ObjectValueBuilder
        .fromObject({id: '2'})
        .build().toObject(),
      {id: '2'},
      'ObjectValue.fromObject simple')

    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .objectValueValue('object2', builder => builder.stringValue('string', 'toto').build())
      .build()

    assert.ok(ob2.equals(ObjectValue.from(ob2).build()), 'ObjectValue.from')

    assert.ok(ob2.equals(ObjectValue.fromObject(ob2.toObject()).build()), 'ObjectValue.fromObject')

    assert.ok(ob2.equals(ObjectValue.fromJson(JSON.stringify(ob2.toJSON())).build()), 'ObjectValue.fromJson')

    assert.ok(JSON.stringify(ob2.toJSON()) === '{"string":"toto","bool":true,"number":12,"array":["tutu",false,12,{"string":"toto","bool":true,"number":12,"array":["tutu",true,12]},["tutu",true,12]],"object":{"string":"toto","bool":true,"number":12,"array":["tutu",true,12]},"object2":{"string":"toto"}}', 'toJSON')

  }

  testEquals() {
    const ob3 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build();
    /**
     * @type {ObjectValue}
     */
    const ob = ob3

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()

    const ob2Bis = ObjectValue.from(ob2).build()

    assert.ok(ob2 === ob2, 'strict equality', 1)
    assert.ok(ob2 !== ob2Bis, 'not strict equality', 2)
    assert.ok(ob2.equals(ob2Bis), 'equals', 3)
    assert.ok(ob2Bis.equals(ob2), 'equals', '3-')

    assert.ok(
      !ob3
        .equals(
          ObjectValue
            .builder()
            .stringValue('stringo', 'toto')
            .booleanValue('boolo', true)
            .numberValue('numbero', 12)
            .arrayValue('arrayo', ['tutu', true, 12])
            .build()
        ), 4
    )

    assert.ok(
      !ob3
        .equals(
          ob4
        ), 5
    )
    assert.ok(
      !ob4
        .equals(
          ob3
        ), '5-'
    )

    const ob5 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tuta', true, 12])
      .build();

    assert.ok(
      !ob3
        .equals(
          ob5
        ), 6
    )

    assert.ok(
      !ob5
        .equals(
          ob3
        ), '6-'
    )

    assert.ok(
      !ob3
        .equals(
          null
        ), 7
    )

    assert.ok(
      ObjectValue.builder()
        .objectValueValue(
          'a',
          ObjectValue.builder()
            .arrayValue('b', [1, 2, 3, 'EXPECTED', 5])
            .build()
        )
        .build().equals(
        ObjectValue.builder()
          .objectValueValue(
            'a',
            ObjectValue.builder()
              .arrayValue('b', [1, 2, 3, 'EXPECTED', 5])
              .build()
          )
          .build()
      ),
      8
    )

    assert.ok(!
        ObjectValue.builder()
          .objectValueValue(
            'a',
            ObjectValue.builder()
              .objectValueValue('b',
                ObjectValue.builder()
                  .arrayValue('c', [1, 2, 3])
                  .build()
              )
              .build()
          )
          .build().equals(
          ObjectValue.builder()
            .objectValueValue(
              'a',
              ObjectValue.builder()
                .arrayValue('b', [1, 2,
                  ObjectValue.builder()
                    .arrayValue('c', [1, 2, 'EXPECTED'])
                    .build()
                  , 4, 5])
                .build()
            )
            .build()
        ),
      9
    )


    assert.ok(ObjectValue.builder().stringValue('string', 'toto').build().equals(ObjectValue.builder().stringValue('string', 'toto').build()), 10)
    assert.ok(!ObjectValue.builder().stringValue('string', 'toto').build().equals(ObjectValue.builder().stringValue('string', 'tutu').build()), 11)
    assert.ok(!ObjectValue.builder().stringValue('string', 'toto').build().equals(ObjectValue.builder().stringValue('string2', 'toto').build()), 12)
    assert.ok(ObjectValue.builder().stringValue('string', null).build().equals(ObjectValue.builder().build()), 13)
    assert.ok(!ObjectValue.builder().stringValue('string', null).build().strictEquals(ObjectValue.builder().build()), 14)
  }

  testBigEquals() {
    const obj1 = ObjectValue.fromObject(fixture_ob1).build()
    const to = ObjectValue.fromObject(fixture_ob2).build();
    this.log(obj1)
    this.log(to)
    assert.ok(!obj1.equals(to),1)
    assert.ok(!obj1.strictEquals(to),2)
    assert.ok(!to.equals(obj1), 3)
    assert.ok(!to.strictEquals(obj1), 4)
  }

  testEqualsDate() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .flexDateTimeValue('dt', new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32'))
      .flexDateValue('d', new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17'))
      .flexTimeValue('t', new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527'))
      .flexZonedDateTimeValue('zdt', new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00'))
      .build()
    assert.ok(ob.equals(ObjectValue.fromObject(ob.toObject()).build()), 'ObjectValue.fromObject')

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .flexDateTimeValue('dt', new globalFlexioImport.io.flexio.flex_types.FlexDateTime('1992-12-17T04:17:32'))
      .flexDateValue('d', new globalFlexioImport.io.flexio.flex_types.FlexDate('1992-10-17'))
      .flexTimeValue('t', new globalFlexioImport.io.flexio.flex_types.FlexTime('04:17:32.527'))
      .flexZonedDateTimeValue('zdt', new globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime('1992-10-17T04:17:32+03:00'))
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob3 = ObjectValue
      .builder()
      .stringValue('dt', '1992-12-17T04:17:32')
      .stringValue('d', '1992-10-17')
      .stringValue('t', '04:17:32.527')
      .stringValue('zdt', '1992-10-17T04:17:32+03:00')
      .build()

    assert.ok(ob.equals(ob2), 'dates should be equals')
    assert.ok(!ob.equals(ob3), 'dates should not be equals')
    assert.ok(ob.flexDateValue('d').equals(ob3.flexDateValue('d')), 'date by accessor should be equals')
    assert.ok(ob.flexTimeValue('t').equals(ob3.flexTimeValue('t')), 'time by accessor should be equals')
    assert.ok(ob.flexDateTimeValue('dt').equals(ob3.flexDateTimeValue('dt')), 'dateTime by accessor should be equals')
    assert.ok(ob.flexZonedDateTimeValue('zdt').equals(ob3.flexZonedDateTimeValue('zdt')), 'ZoneddateTime by accessor should be equals')
  }

  testEqualsNullityAndUndefined() {
    /**
     * @type {ObjectValue}
     */
    const obj1 = ObjectValue.fromObject({
      a: null,
      b: 'toto'
    }).build()
    /**
     * @type {ObjectValue}
     */
    const obj2 = ObjectValue.fromObject({
      b: 'toto'
    }).build()

    assert.ok(obj1.equals(obj2), 'NULL and UNDEFINED should be equals')
    assert.ok(!obj1.strictEquals(obj2), 'NULL and UNDEFINED should not be strict equals')
  }

  testWith() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .flexTimeValue('time', new FlexTime('09:35:10'))
      .flexDateValue('date', new FlexDate('2022-11-03'))
      .flexDateTimeValue('datetime', new FlexDateTime('2022-11-03T09:35:10'))
      .flexZonedDateTimeValue('zdatetime', new FlexZonedDateTime('2022-11-03T09:35:10+02:00'))
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()

    const ob3 = ob2.withBooleanValue('bool', false)

    assert.ok(ob3.rawValue('bool') === false, 'get')
    assert.ok(ob3.equals(ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', false)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()
    ), 'compare instance')

    const ob4 = ob2.withBooleanValue('bool', true)
    assert.ok(ob2 !== ob4, 'immutability : not same instance')
    assert.ok(ob2.equals(ob4), 'immutability : equals')

    assert.ok(ob2.withNumberValue('number', 42).numberValue('number') === 42)
    assert.ok(ob2.withFlexTimeValue('time', new FlexTime('10:35:10')).flexTimeValue('time').equals(new FlexTime('10:35:10')))
    assert.ok(ob2.withFlexDateValue('date', new FlexDate('2022-10-29')).flexDateValue('date').equals(new FlexDate('2022-10-29')))
    assert.ok(ob2.withFlexDateTimeValue('datetime', new FlexDateTime('2022-10-29T10:35:10'))
      .flexDateTimeValue('datetime').equals(new FlexDateTime('2022-10-29T10:35:10')))
    assert.ok(ob2.withFlexZonedDateTimeValue('zdatetime', new FlexZonedDateTime('2022-10-29T10:35:10+02:00'))
      .flexZonedDateTimeValue('zdatetime').equals(new FlexZonedDateTime('2022-10-29T10:35:10+02:00')))
  }

  testSize() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    assert.ok(ob.size() === 4, 'size')
  }

  testProperties() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    const size = ob.size()
    const properties = ob.properties()

    const propertyNames = ob.propertyNames()

    for (let i = 0; i < size; ++i) {
      assert.deepStrictEqual(properties[i], ob.rawValue(propertyNames[i]), 'key : ' + propertyNames[i])
    }
  }

  testException() {
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    assert.throws(() => {
      ob.stringValue('number'),
        TypeError
    })

    assert.throws(() => {
      ob.stringValue('badKey'),
        IndexError
    })

    assert.throws(() => {
      ob.rawValue('badKey'),
        IndexError
    })
  }


  testMerge() {
    const a = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    const b = ObjectValue
      .builder()
      .stringValue('string', 'tutu')
      .stringValue('other-string', 'tutu')
      .arrayValue('array', ['titi', false, 14, 15])
      .build()

    const c = a.mergeWith(b)
    assert.ok(c.stringValue('string'), 'tutu', 'assert `string` overrided')

    assert.deepStrictEqual(
      c.toObject(),
      {
        string: 'tutu',
        bool: true,
        number: 12,
        array: ['titi', false, 14, 15],
        'other-string': 'tutu'
      }, 'should be merged'
    )
  }

  testWithout() {
    const a = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    assert.ok(a.has('string'), 'a object should  have `string`')

    const a2 = a.without('string')

    assert.ok(!a2.has('string'), 'a2 should not have `string`')

  }

  testFromObjectUndefined() {
    const a = {
      'undefined': undefined
    }

    assert.throws(ObjectValue.fromObject(a), IndexError, 'object with undefined value canno\'t be applyed to objectValue')
  }
}


runTest(TestObjectValue)
