import {assertType, formatType, isNull, NotOverrideException} from '../../../assert'
import {isImplement} from '../../../js-helpers'
import {builder} from "./builder/Builder";
import {haveBuilder} from "./builder/HaveBuilder";
import {haveEquals} from "./builder/HaveEquals";

/**
 * @mixin
 * @param {?*} Base
 * @return {{new(): ValueObjectInterface, prototype: ValueObjectInterface}}
 */
export const valueObjectInterface = (Base = class {
}) => {
  /**
   * @interface
   * @implements HaveBuilder
   * @implements HaveEquals
   */
  return class ValueObjectInterface extends haveBuilder(haveEquals(Base)) {

    /**
     * @param {ValueObjectInterface} instance
     * @returns {ValueObjectBuilderInterface}
     */
    static from(instance) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }

    /**
     * @param {Object} jsonObject
     * @returns {ValueObjectBuilderInterface}
     */
    static fromObject(jsonObject) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }

    /**
     * @param {string} json
     * @returns {ValueObjectBuilderInterface}
     */
    static fromJson(json) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }

    /**
     * @returns {Object}
     */
    toObject() {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }

    /**
     * @returns {Object}
     */
    toJSON() {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }

    /**
     * @return {ValueObjectBuilderInterface}
     */
    toBuilder() {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectInterface')
    }
  }
}
const valueObjectInterfaceConstructorString = Object.getPrototypeOf(new (valueObjectInterface((class e {
})))).constructor.toString()


/**
 *
 * @param {ValueObjectInterface} inst
 * @return {boolean}
 */
export const implementsValueObjectInterface = (inst) => {
  return isImplement(inst, valueObjectInterfaceConstructorString)
}


/**
 * @mixin
 * @param {?*} [Base=Class.<>]
 * @return {{new(): ValueObjectBuilderInterface, prototype: ValueObjectBuilderInterface}}
 */
export const valueObjectBuilderInterface = (Base = class {
}) => {
  /**
   * @interface
   * @implements {Builder}
   */
  return class ValueObjectBuilderInterface extends builder(Base) {
    /**
     * @param {Object} jsonObject
     * @returns {ValueObjectBuilderInterface}
     */
    static fromObject(jsonObject) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectBuilderInterface')
    }

    /**
     * @param {string} json
     * @returns {ValueObjectBuilderInterface}
     */
    static fromJson(json) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectBuilderInterface')
    }

    /**
     * @param {Example} instance
     * @returns {ValueObjectBuilderInterface}
     */
    static from(instance) {
      throw NotOverrideException.FROM_INTERFACE('ValueObjectBuilderInterface')
    }
  }
}
const valueObjectBuilderInterfaceConstructorString = Object.getPrototypeOf(new (valueObjectBuilderInterface((class e {
})))).constructor.toString()


export class ValueObjectTypeCheck {
  /**
   * @param {ValueObjectInterface} inst
   * @return {boolean}
   */
  static implementsValueObject(inst) {
    return isImplement(inst, valueObjectInterfaceConstructorString)
  }

  /**
   * @param {ValueObjectInterface} inst
   * @return {ValueObjectInterface}
   */
  static assertImplementsValueObject(inst) {
    assertType(
      ValueObjectTypeCheck.implementsValueObject(inst),
      () => `should implements ValueObjectInterface, given:${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?ValueObjectInterface} inst
   * @return {?ValueObjectInterface}
   */
  static assertImplementsValueObjectOrNull(inst) {
    if (!isNull(inst)) {
      return this.assertImplementsValueObject(inst);
    }
    return inst
  }

  /**
   * @param {ValueObjectBuilderInterface} inst
   * @return {boolean}
   */
  static implementsValueObjectBuilder(inst) {
    return isImplement(inst, valueObjectBuilderInterfaceConstructorString)
  }

  /**
   * @param {ValueObjectBuilderInterface} inst
   * @return {ValueObjectBuilderInterface}
   */
  static assertImplementsValueObjectBuilder(inst) {
    assertType(
      ValueObjectTypeCheck.implementsValueObjectBuilder(inst),
      () => `should implements ValueObjectBuilderInterface, given:${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?ValueObjectBuilderInterface} inst
   * @return {?ValueObjectBuilderInterface}
   */
  static assertImplementsValueObjectBuilderOrNull(inst) {
    if (!isNull(inst)) {
      return this.assertImplementsValueObjectBuilder(inst);
    }
    return inst
  }
}