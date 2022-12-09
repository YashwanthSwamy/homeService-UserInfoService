import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CreateUserModel } from "../model/createUserModel";
import { CreateUserValidator } from "../validators/createUserValidator";

class CreateUserInfoMiddleware {

  public validateRequest(request: Request, response: Response, next: NextFunction) {
    const input: CreateUserModel = {
      customerId: request.body.customerId,
      name: request.body.name,
      email: request.body.email,
      phoneNumber: request.body.phoneNumber,
      street: request.body.street,
      userType: request.body.userType,
      houseNumber: request.body.houseNumber,
      city: request.body.city,
      state: request.body.state,
      country: request.body.country,
      pinCode: request.body.pinCode,
      password: request.body.password,
      offeredService: request.body.offeredService
    };

    try {
      new CreateUserValidator(input)
        .validateCustomerId()
        .validateName()
        .validateEmail()
        .validatePhoneNumber()
        .validateHouseNumber()
        .validateStreet()
        .validateCity()
        .validatePinCode()
        .validateState()
        .validateCountry()
        .validatePassword()
        .validateUserType()

    } catch (err) {
      console.log(err);
      response.status(HttpStatus.BAD_REQUEST);
      response.send(err);
      return;
    }

    next();
  }
}

const createUserInfoMiddleware = new CreateUserInfoMiddleware();
export { createUserInfoMiddleware };