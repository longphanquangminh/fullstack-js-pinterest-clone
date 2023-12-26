import { AuthController } from "./controller/AuthController.js";
import { HinhAnhController } from "./controller/HinhAnhController.js";
import { BinhLuanController } from "./controller/BinhLuanController.js";
import { LuuAnhController } from "./controller/LuuAnhController.js";
import { NguoiDungController } from "./controller/NguoiDungController.js";
import upload from "./config/upload.js";

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
  {
    method: "get",
    route: "/users/:userId",
    controller: NguoiDungController,
    action: "findUser",
  },
  {
    method: "get",
    route: "/saved-by-user/:userId",
    controller: LuuAnhController,
    action: "getSavedPicturesByUser",
  },
  {
    method: "get",
    route: "/created-by-user/:userId",
    controller: HinhAnhController,
    action: "getCreatedPicturesByUser",
  },
  {
    method: "delete",
    route: "/pictures/:pictureId",
    controller: HinhAnhController,
    action: "deletePicture",
  },
  {
    method: "put",
    route: "/users/:userId",
    controller: NguoiDungController,
    action: "editUserInfo",
  },
  {
    method: "post",
    route: "/pictures",
    controller: HinhAnhController,
    middleware: upload.single("file"),
    action: "postPicture",
  },
];
