import CustomerModelDTO from "../../../externalService/database/models/DTO/customerModelDTO";
import { Operation } from "../../../externalService/database/models/types/operation";

export interface UpdateCustomerResponseModel {
    data?: CustomerModelDTO;
    status: Operation;
  }