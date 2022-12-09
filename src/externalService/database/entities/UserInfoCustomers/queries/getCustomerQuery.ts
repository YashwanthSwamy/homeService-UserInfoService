import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import CustomerModelDTO from "../../../models/DTO/customerModelDTO";
import { Operation } from "../../../models/types/operation";

type SelectorModel = { CustomerID: string; };

export class GetCustomerQuery {
    async execute(customerId: string): Promise<CustomerModelDTO> {

        let dbResponse;
        try {
            const query: SelectorModel = { CustomerID: customerId}
            dbResponse = await this.query(query)
        } catch (error) {
            console.error("[DB] fetch user failed", { inputdata: { customerId:  customerId }, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return new CustomerModelDTO(dbResponse[0]);
        }
        console.log("[DB] Non-existent customer", { customerId:  customerId});
        throw Operation.AlreadyExists;
    }

    private query(selector: SelectorModel) {
        const query = db.dbConnector
            .from(Tables.TABLE_CUSTOMERS)
            .where(selector);
            
        return query.then((response: any) => response);
    }
}

const getCustomerQuery = new GetCustomerQuery();
export { getCustomerQuery }