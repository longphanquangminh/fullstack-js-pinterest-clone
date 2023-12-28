import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { NguoiDung } from "../entity/NguoiDung";
import { responseData } from "../config/Response";
import * as bcrypt from "bcrypt";
import { createToken } from "../config/jwt";
import { validate } from "class-validator";
export class AuthController {
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { tuoi, matKhau, hoTen, email } = request.body;

      if (!email) {
        responseData(response, "Vui lòng nhập email!", "", 400);
        return;
      }

      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });
      if (checkUser) {
        responseData(response, "Email đã tồn tại", "", 400);
        return;
      }
      if (!matKhau) {
        responseData(response, "Vui lòng nhập mật khẩu!", "", 400);
        return;
      }
      if (!hoTen) {
        responseData(response, "Vui lòng nhập họ tên!", "", 400);
        return;
      }
      if (!tuoi) {
        responseData(response, "Vui lòng nhập tuổi!", "", 400);
        return;
      }
      const file = request.files as Express.Multer.File[];

      if (file.length > 1) {
        responseData(response, "Vui lòng tải lên không quá 1 hình ảnh!", "", 400);
        return;
      }
      const userFake = Object.assign(new NguoiDung(), {
        anhDaiDien: file.length === 1 ? file[0].filename : null,
        tuoi: !isNaN(tuoi) ? parseInt(tuoi) : tuoi,
        matKhau,
        hoTen,
        email,
      });
      const errors = await validate(userFake, { validationError: { target: false } });
      if (errors.length > 0) {
        responseData(response, "Có lỗi đầu vào!", errors, 400);
        return;
      }
      const user = Object.assign(new NguoiDung(), {
        anhDaiDien: file.length === 1 ? file[0].filename : null,
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

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, matKhau } = request.body;
      if (!email) {
        responseData(response, "Vui lòng nhập email!", "", 400);
        return;
      }
      if (!matKhau) {
        responseData(response, "Vui lòng nhập mật khẩu!", "", 400);
        return;
      }
      const userFake = Object.assign(new NguoiDung(), {
        matKhau,
        email,
      });
      const errors = await validate(userFake, { validationError: { target: false, value: false }, skipMissingProperties: true });
      if (errors.length > 0) {
        responseData(response, "Có lỗi đầu vào!", errors, 400);
        return;
      }
      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });
      if (checkUser) {
        if (bcrypt.compareSync(matKhau, checkUser.matKhau)) {
          const key = new Date().getTime();
          const token = createToken({
            nguoiDungId: checkUser.nguoiDungId,
            key,
          });
          responseData(response, "Đăng nhập thành công!", { token }, 200);
        } else {
          responseData(response, "Mật khẩu không đúng!", "", 400);
        }
      } else {
        responseData(response, "Email không tồn tại!", "", 400);
      }
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
