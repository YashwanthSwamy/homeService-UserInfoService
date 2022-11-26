import { commonValidators } from "../../shared/validators/commonValidators";
import { UpdateUserModel } from "../model/updateUserModel";

export class UpdateUserInfoValidator {
  input: UpdateUserModel;

  constructor(request: UpdateUserModel) {
    this.input = request;
  }

  validateUserId() {
    if (!commonValidators.checkIsValidASCII(this.input.userId)) {
      throw new Error("[VALIDATION] userId undefined/ not ASCII");
    }

    return this;
  }

  validateName() {
    if (!commonValidators.checkIsValidASCII(this.input.name)) {
      throw new Error("[VALIDATION] userId undefined/ not ASCII");
    }

    return this;
  }

  validateEmail() {
    if (!commonValidators.checkIsValidASCII(this.input.email)) {
      throw new Error("[VALIDATION] email undefined/ not ASCII");
    }

    return this;
  }

  validatePhoneNumber() {
    if (!commonValidators.checkIsWholeNumber(this.input.phoneNumber)) {
      throw new Error("[VALIDATION]  phone number undefined/ not a Number");
    }

    return this;
  }

  validateAddress() {
    if (!commonValidators.checkIsValidASCII(this.input.address)) {
      throw new Error("[VALIDATION] userId undefined/ not ASCII");
    }

    return this;
  }
}