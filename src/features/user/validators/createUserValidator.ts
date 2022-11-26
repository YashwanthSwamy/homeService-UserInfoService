import { commonValidators } from "../../shared/validators/commonValidators";
import { UserType } from "../enum/userType";
import { CreateUserModel } from "../model/createUserModel";

export class CreateUserValidator {
  input: CreateUserModel;

  constructor(request: CreateUserModel) {
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

  validateUserType() {
    if (!(this.input.userType in UserType)){
      throw new Error("[VALIDATION] user type undefined/ not Customer or ServiceProvider");
    }

    return this;
  }
}