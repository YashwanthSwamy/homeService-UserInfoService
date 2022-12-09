import { Operation } from "../../../externalService/database/enums/operation";

export interface CreateCustomerResponseModel {
    customerId?: number;
    status: Operation;
  }