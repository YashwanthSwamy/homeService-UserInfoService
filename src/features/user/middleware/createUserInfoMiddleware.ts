import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CreateUserModel } from "../model/createUserModel";
import { CreateUserValidator } from "../validators/createUserValidator";

class CreateUserInfoMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: CreateUserModel = {
            userId: request.body.userId,
            name: request.body.name,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            address: request.body.address,
            userType: request.body.userType
        };
    
        try {
          new CreateUserValidator(input)
          .validateUserId()
          .validateName()
          .validateEmail()
          .validatePhoneNumber()
          .validateAddress()
          .validateUserType()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.json(err);
          return;
        }

        next();
      }
}

const createUserInfoMiddleware = new CreateUserInfoMiddleware();
export { createUserInfoMiddleware };