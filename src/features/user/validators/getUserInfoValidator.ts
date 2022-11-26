import { commonValidators } from "../../shared/validators/commonValidators";
import { GetUserInfoModel } from "../model/getUserInfoModel";

export class GetUserInfoValidator {
    input: GetUserInfoModel;

    constructor(request: GetUserInfoModel) {
        this.input = request;
    }

    validateClientId() {
        if (!commonValidators.checkIsValidASCII(this.input.userId)) {
          throw new Error("[VALIDATION] userId undefined/ not ASCII");
        }
    
        return this;
      }
}