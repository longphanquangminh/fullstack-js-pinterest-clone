import * as express from "express";
import { BinhLuanController } from "../controller/BinhLuanController";

const commentRoute = express.Router();

const commentController = new BinhLuanController();

commentRoute.get("/:pictureId", commentController.getCommentsByPictureId);
commentRoute.post("/:pictureId", commentController.postComment);

export default commentRoute;
