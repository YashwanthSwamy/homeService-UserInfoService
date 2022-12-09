import { NextFunction, Request, Response } from "express";
import { UpdateUserModel } from "../model/updateUserModel";
import HttpStatus from "http-status-codes";

import { UpdateUserInfoValidator } from "../validators/updateUserInfoValidator";

class UpdateUserInfoMiddleware{
    public validateRequest(request: Request, response: Response, next: NextFunction) {
      console.log(request.params)
      console.log(request.body)
        const input: UpdateUserModel = {
          customerId: request.params.customerId,
          name: request.body?.name,
          email: request.body?.email,
          phoneNumber: request.body?.phoneNumber,
          houseNumber: request.body?.houseNumber,
          city: request.body?.city,
          state: request.body?.state,
          country: request.body?.country,
          pinCode: request.body?.pinCode,
          password: request.body?.password,
          street: request.body?.street
        };
    
        try {
          new UpdateUserInfoValidator(input)
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
          
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.send(err);
          return;
        }

        next();
      }
}

const updateUserInfoMiddleware = new UpdateUserInfoMiddleware();
export { updateUserInfoMiddleware };