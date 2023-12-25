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

      // initial info for updating
      const updateFields: updateInfoType = {
        email: user.email,
      };

      if (anhDaiDien) {
        updateFields.anhDaiDien = anhDaiDien;
      }

      if (tuoi) {
        updateFields.tuoi = tuoi;
      }

      if (matKhau) {
        updateFields.matKhau = bcrypt.hashSync(matKhau, 10);
      }

      if (hoTen) {
        updateFields.hoTen = hoTen;
      }

      if (email) {
        updateFields.email = email;
      }

      await AppDataSource.createQueryBuilder()
        .update(NguoiDung)
        .set(updateFields)
        .where("nguoi_dung_id = :nguoi_dung_id", { nguoi_dung_id: accessToken.data.nguoiDungId })
        .execute();

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
