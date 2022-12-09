import { getCustomerQuery } from "../../../externalService/database/entities/UserInfoCustomers/queries/getCustomerQuery";
import { Operation } from "../../../externalService/database/enums/operation";
import { getStatusCode } from "../../shared/service/getStatusCode";

class GetCustomerService {
    async get(customerId: string){
        try {
            const result = await getCustomerQuery.execute(customerId);
            return {
                data: result,
                status: getStatusCode.operationToStatusCode(Operation.Success)
            };
        } catch (operation: any) {
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(operation)
            };
        }
    }
}

const getCustomerService = new GetCustomerService();
export { getCustomerService }