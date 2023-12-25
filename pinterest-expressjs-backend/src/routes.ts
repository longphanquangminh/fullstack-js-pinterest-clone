import { AuthController } from "./controller/AuthController";
import { HinhAnhController } from "./controller/HinhAnhController";
import { BinhLuanController } from "./controller/BinhLuanController";
import { LuuAnhController } from "./controller/LuuAnhController";

export const Routes = [
  {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login",
  },
  {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "register",
  },
  {
    method: "get",
    route: "/pictures",
    controller: HinhAnhController,
    action: "getPictures",
  },
  {
    method: "get",
    route: "/pictures/search-by-name/:pictureName",
    controller: HinhAnhController,
    action: "getPicturesByName",
  },
  {
    method: "get",
    route: "/pictures/:pictureId",
    controller: HinhAnhController,
    action: "getPicturesById",
  },
  {
    method: "get",
    route: "/comments/:pictureId",
    controller: BinhLuanController,
    action: "getCommentsByPictureId",
  },
  {
    method: "get",
    route: "/saved/:pictureId",
    controller: LuuAnhController,
    action: "checkImageSaved",
  },
  {
    method: "post",
    route: "/comments/:pictureId",
    controller: BinhLuanController,
    action: "postComment",
  },
];
