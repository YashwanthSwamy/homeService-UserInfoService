import createCustomerCommand from "../../../externalService/database/entities/UserInfoCustomers/command/createCustomerCommand";
import { Operation } from "../../../externalService/database/enums/operation";
import messageQ from "../../../externalService/messageBroker/messageQ";
import { CreateCustomerResponseModel } from "../model/createCustomerResponseModel";
import { CreateUserModel } from "../model/createUserModel";

class CreateCustomerService {
    async create(customerInfo: CreateUserModel) : Promise<CreateCustomerResponseModel> {
        try {
            const result = await createCustomerCommand.execute(
                {
                    CustomerID: customerInfo.customerId,
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
                    UserType: customerInfo.userType,
                    OfferedService: customerInfo.offeredService
                });
            await messageQ.publishCreatedCustomer(customerInfo);
            return {
                customerId: result,
                status: Operation.Success
            };
        } catch (operation: any) {
            return {
                customerId: undefined,
                status: operation
            };
        }
    }
}

const createCustomerService = new CreateCustomerService();
export { createCustomerService };