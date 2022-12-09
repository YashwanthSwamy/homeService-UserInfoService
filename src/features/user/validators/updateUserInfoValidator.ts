import { commonValidators } from "../../shared/validators/commonValidators";
import { UpdateUserModel } from "../model/updateUserModel";

export class UpdateUserInfoValidator {
  input: UpdateUserModel;

  constructor(request: UpdateUserModel) {
    this.input = request;
  }

  validateCustomerId() {
    if (!commonValidators.checkIsValidASCII(this.input.customerId)) {
      throw new Error("[VALIDATION] Customer ID undefined/ not ASCII");
    }

    return this;
  }

  validateName() {

    if (this.input.name != undefined && !commonValidators.checkIsValidASCII(this.input.name)) {
      throw new Error("[VALIDATION] name undefined/ not ASCII");
    }

    return this;
  }

  validateEmail() {

    if (this.input.email != undefined && !commonValidators.checkIsValidASCII(this.input.email)) {
      throw new Error("[VALIDATION] email undefined/ not ASCII");
    }

    return this;
  }

  validatePhoneNumber() {

    if (this.input.phoneNumber != undefined && !commonValidators.checkIsWholeNumber(this.input.phoneNumber)) {
      throw new Error("[VALIDATION]  phone number undefined/ not a Number");
    }

    return this;
  }

  validateHouseNumber() {

    if (this.input.houseNumber != undefined && !commonValidators.checkIsValidASCII(this.input.houseNumber)) {
      throw new Error("[VALIDATION] houseNumber undefined/ not ASCII");
    }

    return this;
  }

  validateStreet() {

    if (this.input.street != undefined && !commonValidators.checkIsValidASCII(this.input.street)) {
      throw new Error("[VALIDATION] street undefined/ not ASCII");
    }

    return this;
  }

  validateCity() {

    if (this.input.city != undefined && !commonValidators.checkIsValidASCII(this.input.city)) {
      throw new Error("[VALIDATION] city undefined/ not ASCII");
    }

    return this;
  }

  validateState() {

    if (this.input.state != undefined && !commonValidators.checkIsValidASCII(this.input.state)) {
      throw new Error("[VALIDATION] state undefined/ not ASCII");
    }

    return this;
  }

  validateCountry() {
    
    if (this.input.country != undefined && !commonValidators.checkIsValidASCII(this.input.country)) {
      throw new Error("[VALIDATION] country undefined/ not ASCII");
    }

    return this;
  }

  validatePinCode() {

    if (this.input.pinCode != undefined && !commonValidators.checkIsValidASCII(this.input.pinCode)) {
      throw new Error("[VALIDATION] pinCode undefined/ not ASCII");
    }

    return this;
  }

  validatePassword() {

    if (this.input.password != undefined &&  !commonValidators.checkIsValidASCII(this.input.password)) {
      throw new Error("[VALIDATION] password undefined/ not ASCII");
    }

    return this;
  }
}