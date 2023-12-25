import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { NguoiDung } from "../entity/NguoiDung";
import { responseData } from "../config/Response";

export class NguoiDungController {
  private userRepository = AppDataSource.getRepository(NguoiDung);

  async findUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = parseInt(request.params.userId);

      const user = await this.userRepository.findOne({
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
