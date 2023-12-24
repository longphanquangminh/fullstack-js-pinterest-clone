import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { NguoiDung } from "./entity/NguoiDung";
import { HinhAnh } from "./entity/HinhAnh";
import { LuuAnh } from "./entity/LuuAnh";
import { BinhLuan } from "./entity/BinhLuan";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: "system",
  password: "1234",
  database: "free",
  synchronize: true,
  logging: false,
  entities: [NguoiDung, HinhAnh, LuuAnh, BinhLuan, User],
  migrations: [],
  subscribers: [],
});
