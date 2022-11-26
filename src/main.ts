import bodyParser from "body-parser";
import express from "express";
import { environmentVariables } from "./configuration/environmentVariables";
import { userInfoRoutes } from "./routes/userInfoRoutes";

const port = environmentVariables.PORT;
const app = express();

function checkErrors(err: any, req: any, res: any, next: any) {
    // Catch JSON error
    if (err instanceof SyntaxError && err.message.indexOf("JSON")) {
      res.status(400).json({ errorCode: 100, Ref: "Error parsing JSON" });
    } else {
      res.status(400).json({ errorCode: 101, Ref: "Error parsing JSON" });
    }
  }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkErrors);
app.use(userInfoRoutes);