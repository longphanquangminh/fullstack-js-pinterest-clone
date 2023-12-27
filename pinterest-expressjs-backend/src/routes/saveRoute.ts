import * as express from "express";
import { LuuAnhController } from "../controller/LuuAnhController";

const saveRoute = express.Router();

const saveController = new LuuAnhController();

saveRoute.get("/:pictureId", saveController.checkImageSaved);
saveRoute.get("/:userId", saveController.getSavedPicturesByUser);

export default saveRoute;
