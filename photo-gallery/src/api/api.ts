import { https } from "./config";

export const userServ = {
  login: (values: any) => https.post("/login", values),
  signup: (values: any) => https.post("/register", values),
};
