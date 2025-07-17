import {assertType} from "../../../assert";
import {implementsValueObjectInterface, ValueObjectTypeCheck} from "./ValueObjectInterface";
import {Checksum} from "../../../js-helpers";

export class ValueObjectHelper {
  /**
   * @param {ValueObjectInterface} valueObject
   * @return {string}
   */
  static hash(valueObject) {
    ValueObjectTypeCheck.assertImplementsValueObject(valueObject)
    return '_' + Checksum.number32bit(JSON.stringify(valueObject)) + '_';
  }
}