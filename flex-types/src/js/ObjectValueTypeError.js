import {BaseException} from "../../../js-type-helpers/index.js";
import {formatType} from "../../../assert/index.js";

export class ObjectValueTypeError extends BaseException {

  realName() {
    return 'ObjectValueTypeError'
  }

  /**
   * @param {*} inst
   * @return {ObjectValueTypeError}
   */
  static NOT_RECOGNIZED(inst) {
    return new ObjectValueTypeError(`value can not be handled by ObjectValue:${formatType(inst)}`)
  }



}


