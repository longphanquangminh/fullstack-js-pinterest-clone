import * as express from "express";
import { NguoiDungController } from "../controller/NguoiDungController";

const userRoute = express.Router();

const userController = new NguoiDungController();

userRoute.get("/:userId", userController.findUser);
userRoute.put("/:userId", userController.editUserInfo);

export default userRoute;
