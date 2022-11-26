import { UserType } from "../enum/userType";

export interface CreateUserModel {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    userType: string
}