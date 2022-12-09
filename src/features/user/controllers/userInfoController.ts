import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { checkAuthorizationService } from "../service/checkAuthorizationService";
import { createCustomerService } from "../service/createCustomerService";
import { getCustomerService } from "../service/getCustomerService";
import { updateCustomerService } from "../service/updateCustomerService";

class UserInfoController {
    async addUser(req: Request, res: Response) {
        console.log("[Controller] Add User", { input: req.body });
        const result = await createCustomerService.create(req.body)
        res.status(HttpStatus.OK);
        res.send(result.customerId);
    }

    async updateUser(req: Request, res: Response) {
        console.log("[Controller] Update User", { input: req.body })
        const result = await updateCustomerService.update(req.params.customerId, req.body)
        res.status(result.status);
        res.send(result.data);
    }

    async getUserInfo(req: Request, res: Response) {
        console.log("[Controller] Get User", { input: {customerId: req.params.customerId} })
        const result = await getCustomerService.get(req.params.customerId)
        res.status(result.status);
        res.send(result.data);
    }

    async checkAuthorization(req: Request, res: Response) {
        console.log("[Controller] Check Authorization", { input: {customerId: req.params.customerId} })
        const result = await checkAuthorizationService.getCustomerInfoIfAuthorized(req.params.customerId, req.body.password)
        res.status(result.status);
        res.send(result.data);
    }

}

const userInfoController = new UserInfoController()
export { userInfoController }