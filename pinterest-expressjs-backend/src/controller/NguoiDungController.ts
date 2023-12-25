import * as bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { NguoiDung } from "../entity/NguoiDung";
import { responseData } from "../config/Response";
import { decodeToken } from "../config/jwt";
import { updateInfoType } from "../types/updateInfoType";

export class NguoiDungController {
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async editUserInfo(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = parseInt(request.params.userId);

      const checkUser = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: userId },
      });

      if (!checkUser) {
        responseData(response, "Không tìm thấy người dùng", "", 400);
        return;
      }

      const { token } = request.headers;

      if (!token || token == "" || token == null || token == undefined) {
        responseData(response, "Chưa truyền token!", "", 400);
        return;
      }

      const accessToken = decodeToken(token);

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: accessToken.data.nguoiDungId },
      });

      if (!user || accessToken.data.nguoiDungId !== userId) {
        responseData(response, "Token không hợp lệ!", "", 401);
        return;
      }

      const { anhDaiDien, tuoi, matKhau, hoTen, email } = request.body;

      if (!tuoi || !hoTen || !email) {
        responseData(response, "Vui lòng cung cấp đủ thông tin!", "", 400);
        return;
      }

      const updateFields: updateInfoType = {
        anhDaiDien: anhDaiDien ?? null,
        tuoi,
        hoTen,
        email,
      };

      // Only update the password if it is provided
      if (matKhau) {
        updateFields.matKhau = bcrypt.hashSync(matKhau, 10);
      }

      await AppDataSource.createQueryBuilder().update(NguoiDung).set(updateFields).where("id = :id", { id: accessToken.data.nguoiDungId }).execute();

      responseData(response, "Cập nhật thông tin thành công", "", 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async findUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = parseInt(request.params.userId);

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: userId },
      });

      if (!user) {
        responseData(response, "Không tìm thấy người dùng", "", 400);
        return;
      }
      responseData(response, "Thành công", user, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
