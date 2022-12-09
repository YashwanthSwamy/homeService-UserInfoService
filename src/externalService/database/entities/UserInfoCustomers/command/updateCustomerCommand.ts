import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import { UpdateCustomerModel } from "../../../models/DAO/updateCustomerModel";
import CustomerModelDTO from "../../../models/DTO/customerModelDTO";
import { Operation } from "../../../enums/operation";


export class UpdateCustomerCommand {

    async execute(selector: UpdateWhereClauseModel, updateRequest: UpdateCustomerModel): Promise<CustomerModelDTO> {

        let dbResponse;
        try {
            dbResponse = await this.query(updateRequest, selector);
        } catch (error) {
            console.error("[DB] update user failed", { inputdata: updateRequest, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return new CustomerModelDTO(dbResponse[0]);
        }

        console.log("[DB] Non-existent customer", { inputData: { updateRequest, for: selector } });
        throw Operation.ObjectDoesNotExists;
    }

    private async query(
        updateRequest: UpdateCustomerModel,
        selector: UpdateWhereClauseModel,
      ) {

        const query = db.dbConnector.update(updateRequest)
          .into(Tables.TABLE_CUSTOMERS)
          .where(selector)
          .returning("*");

        return query.then((response: any) => response);
      }
}

const updateCustomerCommand = new UpdateCustomerCommand();
export default updateCustomerCommand;