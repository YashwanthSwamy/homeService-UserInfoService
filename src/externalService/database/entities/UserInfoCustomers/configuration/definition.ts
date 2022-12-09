import Knex from "knex";

export default class UserInfoCustomers {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("CustomerID").notNullable();
    table.primary(["CustomerID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
    table.integer("PhoneNumber").notNullable();
    table.string("HouseNumber").nullable();
    table.string("Street").notNullable();
    table.string("City").notNullable();
    table.string("State").notNullable();
    table.string("Country").notNullable();
    table.integer("PinCode").notNullable();
    table.string("Password").notNullable();;
    table.string("UserType").notNullable();
    table.string("OfferedService").nullable();
  }

}
