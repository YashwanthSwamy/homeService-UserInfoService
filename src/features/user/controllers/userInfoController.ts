import { Request, Response } from "express";
import HttpStatus from "http-status-codes";

class UserInfoController{
    addUser(req: Request, res: Response){
        console.log("[Controller] Add User", {input: req.body});
        try {
            const result = { status : 200,  data : ""}
            res.status(HttpStatus.OK);
            res.send(result.data);
        } catch (error) {
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.send(undefined);
        }
    }

    updateUser(req: Request, res: Response){
        console.log("[Controller] Update User", {input: req.body})
        try {
            const result = { status : 200,  data : ""}
            res.status(HttpStatus.OK);
            res.send(result.data);
        } catch (error) {
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.send(undefined);
        }
    }

    getUserInfo(req: Request, res: Response){
        console.log("[Controller] Get User", {input: req.body})
        try {
            const result = { status : 200,  data : ""}
            res.status(HttpStatus.OK);
            res.send(result.data);
        } catch (status) {
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.send(undefined);
        }
    }
}

const userInfoController = new UserInfoController()
export { userInfoController }