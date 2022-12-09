import { Tables } from "../constants/Tables";
import UserInfoCustomers from "../entities/UserInfoCustomers/configuration/definition";
import { createTable } from "./CreateTable";

export class TableInitializer {

  static async init() {
    await createTable.create(Tables.TABLE_CUSTOMERS, UserInfoCustomers.definition);
  }
}
