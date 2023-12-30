import { AuthController } from "./controller/AuthController";
import { HinhAnhController } from "./controller/HinhAnhController";
import { BinhLuanController } from "./controller/BinhLuanController";
import { LuuAnhController } from "./controller/LuuAnhController";
import { NguoiDungController } from "./controller/NguoiDungController";
import upload from "./config/upload";

export const Routes: any = [
  {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login",
  },
  // {
  //   method: "post",
  //   route: "/register",
  //   controller: AuthController,
  //   action: "register",
  //   middleware: [upload.array("file")],
  // },
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
    route: "/saved/:pictureId",
    controller: LuuAnhController,
    action: "postSave",
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
    middleware: upload.single("file"),
  },
  {
    method: "post",
    route: "/users/avatar/:userId",
    controller: NguoiDungController,
    action: "editUserAvatar",
    middleware: upload.single("file"),
  },
  {
    method: "post",
    route: "/pictures",
    controller: HinhAnhController,
    action: "postPicture",
    middleware: [upload.single("file")],
  },
];
