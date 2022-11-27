import Knex from "knex";

export default class UserInfoCustomers {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("UserID").notNullable();
    table.primary(["UserID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
    table.integer("PhoneNumber").notNullable();
    table.string("Street").nullable();
    table.string("City").nullable();
    table.string("State").nullable();
    table.string("Country").nullable();
    table.integer("PinCode").nullable();
    table.string("Password").nullable();;
    table.string("UserType").nullable();
  }

}
