import createCustomerCommand from "../../../externalService/database/entities/UserInfoCustomers/command/createCustomerCommand";
import { Operation } from "../../../externalService/database/models/types/operation";
import { CreateCustomerResponseModel } from "../model/createCustomerResponseModel";
import { CreateUserModel } from "../model/createUserModel";

class CreateCustomerService {
    async create(customerInfo: CreateUserModel) : Promise<CreateCustomerResponseModel> {
        try {
            const result = await createCustomerCommand.execute(
                {
                    CustomerID: customerInfo.email,
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