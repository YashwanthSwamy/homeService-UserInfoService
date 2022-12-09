import { Operation } from "../../../externalService/database/models/types/operation";

export interface CreateCustomerResponseModel {
    customerId?: number;
    status: Operation;
  }