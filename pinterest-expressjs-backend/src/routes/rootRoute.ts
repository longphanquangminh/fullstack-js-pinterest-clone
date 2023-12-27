import * as express from "express";
import authRoute from "./authRoute";
import saveRoute from "./saveRoute";
import commentRoute from "./commentRoute";
import pictureRoute from "./pictureRoute";
import userRoute from "./userRoute";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/comments", commentRoute);
rootRoute.use("/pictures", pictureRoute);
rootRoute.use("/users", userRoute);
rootRoute.use("/saved", saveRoute);

export default rootRoute;
