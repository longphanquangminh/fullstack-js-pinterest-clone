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

  async getSavedPicturesByUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.params.userId;

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: userId },
      });

      if (!user) {
        responseData(response, "Người dùng không tồn tại!", "", 400);
        return;
      }

      const savedPictures = await this.luuAnhRepository
        .createQueryBuilder("luuAnh")
        .leftJoinAndSelect("luuAnh.hinh", "hinh")
        .leftJoinAndSelect("hinh.nguoiDung", "nguoiDung")
        .where({
          nguoiDung: {
            nguoiDungId: userId,
          },
        })
        .getMany();

      if (savedPictures.length === 0) {
        responseData(response, "Người dùng chưa lưu ảnh nào!", "", 400);
        return;
      }
      responseData(response, "Thành công", savedPictures, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

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
