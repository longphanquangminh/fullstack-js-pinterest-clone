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
        responseData(response, "Please type email!", "", 400);
        return;
      }

      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });
      if (checkUser) {
        responseData(response, "Email already exist!", "", 400);
        return;
      }
      if (!matKhau) {
        responseData(response, "Please type password!", "", 400);
        return;
      }
      if (!hoTen) {
        responseData(response, "Please type your full name!", "", 400);
        return;
      }
      if (isNaN(tuoi) || !tuoi || !Number.isInteger(tuoi) || tuoi < 15) {
        responseData(response, "Age must be a integer and higher than 14!", "", 400);
        return;
      }
      // const file = request.files as Express.Multer.File[];

      // if (file.length > 1) {
      //   responseData(response, "Please upload only 1 image!", "", 400);
      //   return;
      // }
      // const userFake = Object.assign(new NguoiDung(), {
      //   anhDaiDien: file.length === 1 ? file[0].filename : null,
      //   tuoi: !isNaN(tuoi) ? parseInt(tuoi) : tuoi,
      //   matKhau,
      //   hoTen,
      //   email,
      // });
      const userFake = Object.assign(new NguoiDung(), {
        anhDaiDien: null,
        tuoi: !isNaN(tuoi) ? parseInt(tuoi) : tuoi,
        matKhau,
        hoTen,
        email,
      });
      const errors = await validate(userFake, { validationError: { target: false } });
      if (errors.length > 0) {
        responseData(response, "Input error!", errors, 400);
        return;
      }
      // const user = Object.assign(new NguoiDung(), {
      //   anhDaiDien: file.length === 1 ? file[0].filename : null,
      //   tuoi,
      //   matKhau: bcrypt.hashSync(matKhau, 10),
      //   hoTen,
      //   email,
      // });
      const user = Object.assign(new NguoiDung(), {
        tuoi,
        matKhau: bcrypt.hashSync(matKhau, 10),
        hoTen,
        email,
      });
      await this.nguoiDungRepository.save(user);
      responseData(response, "Register successfully!", "", 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, matKhau } = request.body;
      if (!email) {
        responseData(response, "Please type email!", "", 400);
        return;
      }
      if (!matKhau) {
        responseData(response, "Please type password!", "", 400);
        return;
      }
      const userFake = Object.assign(new NguoiDung(), {
        matKhau,
        email,
      });
      const errors = await validate(userFake, { validationError: { target: false, value: false }, skipMissingProperties: true });
      if (errors.length > 0) {
        responseData(response, "Input error!", errors, 400);
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
          delete checkUser.matKhau;
          responseData(response, "Login successfully!", { token, userInfo: checkUser }, 200);
        } else {
          responseData(response, "Password is not correct!", "", 400);
        }
      } else {
        responseData(response, "Email does not exist!", "", 400);
      }
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }
}
