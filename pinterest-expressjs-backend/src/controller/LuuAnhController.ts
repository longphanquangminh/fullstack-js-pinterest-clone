import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { LuuAnh } from "../entity/LuuAnh";
import { HinhAnh } from "../entity/HinhAnh";
import { NguoiDung } from "../entity/NguoiDung";
import { decodeToken } from "../config/jwt";
export class LuuAnhController {
  private luuAnhRepository = AppDataSource.getRepository(LuuAnh);
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async checkImageSaved(request: Request, response: Response, next: NextFunction) {
    try {
      const { pictureId } = request.params;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: pictureId },
      });

      if (!picture) {
        responseData(response, "Không tìm thấy hình ảnh!", "", 400);
        return;
      }

      const { token } = request.headers;
      const accessToken = decodeToken(token);

      const checkPicture = await this.luuAnhRepository
        .createQueryBuilder("luuAnh")
        .where({
          hinh: {
            hinhId: pictureId,
          },
          nguoiDung: {
            nguoiDungId: accessToken.data.nguoiDungId,
          },
        })
        .getOne();

      if (!checkPicture) {
        responseData(
          response,
          "Người dùng chưa lưu ảnh!",
          {
            saved: false,
          },
          200,
        );
        return;
      }
      responseData(
        response,
        "Người dùng đã lưu ảnh!",
        {
          saved: true,
        },
        200,
      );
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}