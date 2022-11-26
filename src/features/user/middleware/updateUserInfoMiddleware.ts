import { NextFunction, Request, Response } from "express";
import { UpdateUserModel } from "../model/updateUserModel";
import HttpStatus from "http-status-codes";

import { UpdateUserInfoValidator } from "../validators/updateUserInfoValidator";

class UpdateUserInfoMiddleware{
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: UpdateUserModel = {
            userId: request.body.userId,
            name: request.body.name,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            address: request.body.address,
        };
    
        try {
          new UpdateUserInfoValidator(input)
          .validateUserId()
          .validateName()
          .validateEmail()
          .validatePhoneNumber()
          .validateAddress()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.json(err);
          return;
        }

        next();
      }
}

const updateUserInfoMiddleware = new UpdateUserInfoMiddleware();
export { updateUserInfoMiddleware };