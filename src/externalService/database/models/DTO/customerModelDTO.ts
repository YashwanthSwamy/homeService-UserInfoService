export interface ICustomerDBModel {
    CustomerId: string;
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
    OfferedService: string| null;
}


export default class CustomerModelDTO {
    customerId: string;
    name: string;
    email: string;
    phoneNumber: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    password: string;
    userType: string;
    offeredService: string | null;
  
    constructor(customer: ICustomerDBModel) {
        this.customerId = customer.CustomerId;
        this.name = customer.Name;
        this.email = customer.Email;
        this.phoneNumber = customer.PhoneNumber;
        this.houseNumber = customer.HouseNumber;
        this.street = customer.Street;
        this.city = customer.City;
        this.state = customer.State;
        this.country = customer.Country;
        this.pinCode = customer.PinCode;
        this.password = customer.Password;
        this.userType = customer.UserType;
        this.offeredService = customer.OfferedService;
    }
  }