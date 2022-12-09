import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import { CreateCustomerModel } from "../../../models/DAO/createCustomerModel";
import { Operation } from "../../../models/types/operation";


export class CreateCustomerCommand {

    async execute(request: CreateCustomerModel): Promise<number> {

        let dbResponse: Array<CreateCutomerDBResponse>;
        try {
            dbResponse = (await this.query(request)) as Array<CreateCutomerDBResponse>;
        } catch (error) {
            console.error("[DB] create user failed", { inputdata: request, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return dbResponse[0].CustomerID;
        }
        console.log(`[DB] Already exist`, { inputData: request });
        throw Operation.AlreadyExists;
    }

    private query(request: CreateCustomerModel) {
        const query = db.dbConnector
            .insert(request)
            .into(Tables.TABLE_CUSTOMERS)
            .returning(["CustomerID"]);
        return query.then((response: any) => response);
    }
}

const createCustomerCommand = new CreateCustomerCommand();
export default createCustomerCommand;