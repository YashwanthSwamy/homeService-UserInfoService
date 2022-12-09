import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CheckUserAuthorizationModel } from "../model/checkUserAuthorizationModel";
import { CheckUserAuthorizationValidator } from "../validators/CheckUserAuthorizationValidator";

class CheckAuthorizationMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: CheckUserAuthorizationModel = {
          customerId: request.params.customerId,
          password: request.body.password
        };
    
        try {
          new CheckUserAuthorizationValidator(input)
            .validateCustomerId()
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

const checkAuthorizationMiddleware = new CheckAuthorizationMiddleware();
export { checkAuthorizationMiddleware };