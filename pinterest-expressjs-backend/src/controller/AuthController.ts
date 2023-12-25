import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { NguoiDung } from "../entity/NguoiDung";
import { responseData } from "../config/Response";
import * as bcrypt from "bcrypt";
import { createToken } from "../config/jwt";
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

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { anhDaiDien, tuoi, matKhau, hoTen, email } = request.body;

      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });

      // check trùng email
      if (checkUser) {
        // res.status(400).send("Email đã tồn tại");
        responseData(response, "Email đã tồn tại", "", 400);
        return;
      }

      const user = Object.assign(new NguoiDung(), {
        anhDaiDien: anhDaiDien ?? null,
        tuoi,
        matKhau: bcrypt.hashSync(matKhau, 10),
        hoTen,
        email,
      });

      await this.nguoiDungRepository.save(user);
      responseData(response, "Đăng ký thành công", "", 200);
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

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, matKhau } = request.body;
      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });

      // tồn tại => login thành công
      if (checkUser) {
        if (bcrypt.compareSync(matKhau, checkUser.matKhau)) {
          // miniliseconds
          const key = new Date().getTime();

          const token = createToken({
            nguoiDungId: checkUser.nguoiDungId,
            key,
          });

          responseData(response, "Login thành công", { token }, 200);
        } else {
          responseData(response, "Mật khẩu không đúng", "", 400);
        }
      } else {
        // ko tồn tại => sai email hoặc pass
        responseData(response, "Email không đúng", "", 400);
      }
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
