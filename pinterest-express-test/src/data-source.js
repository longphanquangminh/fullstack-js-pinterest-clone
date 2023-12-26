import "reflect-metadata";
import { DataSource } from "typeorm";
import { NguoiDung } from "./entity/NguoiDung.js";
import { HinhAnh } from "./entity/HinhAnh.js";
import { LuuAnh } from "./entity/LuuAnh.js";
import { BinhLuan } from "./entity/BinhLuan.js";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: "system",
  password: "1234",
  database: "free",
  synchronize: true,
  logging: false,
  entities: [NguoiDung, HinhAnh, LuuAnh, BinhLuan],
  migrations: [],
  subscribers: [],
});
