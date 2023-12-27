import * as express from "express";
import { HinhAnhController } from "../controller/HinhAnhController";

const pictureRoute = express.Router();

const pictureController = new HinhAnhController();

pictureRoute.get("/", pictureController.getPictures);
pictureRoute.post("/", pictureController.postPicture);
pictureRoute.get("/search-by-name/:pictureName", pictureController.getPicturesByName);
pictureRoute.get("/:pictureId", pictureController.getPicturesById);
pictureRoute.delete("/:pictureId", pictureController.deletePicture);
pictureRoute.get("/created-by-user/:userId", pictureController.getCreatedPicturesByUser);

export default pictureRoute;
