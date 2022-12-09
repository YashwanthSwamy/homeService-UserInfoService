import { getCustomerQuery } from "../../../externalService/database/entities/UserInfoCustomers/queries/getCustomerQuery";
import { Operation } from "../../../externalService/database/enums/operation";
import { getStatusCode } from "../../shared/service/getStatusCode";

class CheckAuthorizationService {
    async getCustomerInfoIfAuthorized(customerId: string, password: string){
        try {
            const result = await getCustomerQuery.execute(customerId);
            if (result.password === password){
                return {
                    data: result,
                    status: getStatusCode.operationToStatusCode(Operation.Success)
                };
            }
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(Operation.Error)
            };
        } catch (operation: any) {
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(operation)
            };
        }
    }
}

const checkAuthorizationService = new CheckAuthorizationService();
export { checkAuthorizationService }