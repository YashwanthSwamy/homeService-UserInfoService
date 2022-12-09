export interface CreateCustomerModel {
    CustomerID: string;
    Name: string;
    Email: string;
    PhoneNumber: string;
    HouseNumber: string;
    Street: string;
    City: string;
    State: string;
    Country: string;
    PinCode: string;
    Password: string;
    UserType: string;
    OfferedService: string | null
}