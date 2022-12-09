import updateCustomerCommand from "../../../externalService/database/entities/UserInfoCustomers/command/updateCustomerCommand";
import { Operation } from "../../../externalService/database/enums/operation";
import { UpdateCustomerResponseModel } from "../model/updateCustomerResponseModel";
import { UpdateUserModel } from "../model/updateUserModel";
import { getStatusCode } from "../../shared/service/getStatusCode";
import messageQ from "../../../externalService/messageBroker/messageQ";

class UpdateCustomerService {
    async update(customerId: string, customerInfo: UpdateUserModel) : Promise<UpdateCustomerResponseModel> {
        try {
            const updateCustomerValues = {
                Name: customerInfo.name,
                Email: customerInfo.email,
                PhoneNumber: customerInfo.phoneNumber,
                HouseNumber: customerInfo.houseNumber,
                Street: customerInfo.street,
                City: customerInfo.city,
                State: customerInfo.state,
                Country: customerInfo.country,
                PinCode: customerInfo.pinCode,
                Password: customerInfo.password,
            }

            const updateCustomerInfoFor = {
                CustomerID: customerId
            }
            const result = await updateCustomerCommand.execute(updateCustomerInfoFor, updateCustomerValues);
            customerInfo.customerId = customerId;
            await messageQ.publishUpdatedCustomer(customerInfo);
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

const updateCustomerService = new UpdateCustomerService();
export { updateCustomerService };