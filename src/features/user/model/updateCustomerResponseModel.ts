import CustomerModelDTO from "../../../externalService/database/models/DTO/customerModelDTO";
import { Operation } from "../../../externalService/database/enums/operation";

export interface UpdateCustomerResponseModel {
    data?: CustomerModelDTO;
    status: Operation;
  }