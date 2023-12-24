import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { NguoiDung } from "../entity/NguoiDung";
import bcrypt from "bcrypt";
import { responseData } from "../config/Response";

export class AuthController {
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.nguoiDungRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const nguoiDungId = parseInt(request.params.nguoiDungId);

    const user = await this.nguoiDungRepository.findOne({
      where: { nguoiDungId },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { anhDaiDien, tuoi, matKhau, hoTen, email } = request.body;

      const checkUser = await this.nguoiDungRepository.findOne({
        where: { email },
      });

      // check trùng email
      if (checkUser) {
        // res.status(400).send("Email đã tồn tại");
        responseData(response, "Email đã tồn tại", "", 400);
      }

      const user = Object.assign(new NguoiDung(), {
        anhDaiDien: anhDaiDien ?? null,
        tuoi,
        matKhau: bcrypt.hashSync(matKhau, 10),
        hoTen,
        email,
      });

      return this.nguoiDungRepository.save(user);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const nguoiDungId = parseInt(request.params.nguoiDungId);

    let userToRemove = await this.nguoiDungRepository.findOneBy({ nguoiDungId });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.nguoiDungRepository.remove(userToRemove);

    return "user has been removed";
  }
}
