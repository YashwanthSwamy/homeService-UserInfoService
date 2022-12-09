import { commonValidators } from "../../shared/validators/commonValidators";
import { UserType } from "../enum/userType";
import { CreateUserModel } from "../model/createUserModel";

export class CreateUserValidator {
  input: CreateUserModel;

  constructor(request: CreateUserModel) {
    this.input = request;
  }

  validateCustomerId() {
    console.log("c", this.input.customerId)
    if (!commonValidators.checkIsValidASCII(this.input.customerId)) {
      throw new Error("[VALIDATION] customer ID undefined/ not ASCII");
    }

    return this;
  }

  validateName() {
    if (!commonValidators.checkIsValidASCII(this.input.name)) {
      throw new Error("[VALIDATION] customer ID undefined/ not ASCII");
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

  validateHouseNumber() {
    if (!commonValidators.checkIsValidASCII(this.input.houseNumber)) {
      throw new Error("[VALIDATION] houseNumber undefined/ not ASCII");
    }

    return this;
  }

  validateStreet() {
    if (!commonValidators.checkIsValidASCII(this.input.street)) {
      throw new Error("[VALIDATION] street undefined/ not ASCII");
    }

    return this;
  }

  validateCity() {
    if (!commonValidators.checkIsValidASCII(this.input.city)) {
      throw new Error("[VALIDATION] city undefined/ not ASCII");
    }

    return this;
  }

  validateState() {
    if (!commonValidators.checkIsValidASCII(this.input.state)) {
      throw new Error("[VALIDATION] state undefined/ not ASCII");
    }

    return this;
  }

  validateCountry() {
    if (!commonValidators.checkIsValidASCII(this.input.country)) {
      throw new Error("[VALIDATION] country undefined/ not ASCII");
    }

    return this;
  }

  validatePinCode() {
    if (!commonValidators.checkIsValidASCII(this.input.pinCode)) {
      throw new Error("[VALIDATION] pincode undefined/ not ASCII");
    }

    return this;
  }

  validatePassword() {
    if (!commonValidators.checkIsValidASCII(this.input.password)) {
      throw new Error("[VALIDATION] password undefined/ not ASCII");
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