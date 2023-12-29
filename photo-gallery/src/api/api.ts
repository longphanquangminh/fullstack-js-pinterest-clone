import { httpsNoLoading } from "./config";

export const userServ = {
  login: (values: any) => httpsNoLoading.post("/auth/signin", values),
  signup: (values: any) => httpsNoLoading.post("/auth/signup", values),
};
