import * as express from "express";
import { AuthController } from "../controller/AuthController";

const authRoute = express.Router();

const authController = new AuthController();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);

export default authRoute;
