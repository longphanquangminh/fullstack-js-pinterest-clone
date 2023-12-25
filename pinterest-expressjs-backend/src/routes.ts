import { AuthController } from "./controller/AuthController";
import { UserController } from "./controller/UserController";
import { HinhAnhController } from "./controller/HinhAnhController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
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
    route: "/pictures/:pictureName",
    controller: HinhAnhController,
    action: "getPicturesByName",
  },
];