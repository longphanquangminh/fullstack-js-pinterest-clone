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

  async postSave(request: Request, response: Response, next: NextFunction) {
    try {
      const { pictureId } = request.params;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
      });

      if (!picture) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }

      const { token } = request.headers;

      if (!token || token == "" || token == null || token == undefined) {
        responseData(response, "Don't have token!", "", 400);
        return;
      }

      const accessToken = decodeToken(token);

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: accessToken.data.nguoiDungId },
      });

      if (!user) {
        responseData(response, "Token is not valid!", "", 401);
        return;
      }

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
        const userSavePic = Object.assign(new LuuAnh(), {
          ngayLuu: new Date(),
          hinh: picture,
          nguoiDung: user,
        });

        await this.luuAnhRepository.save(userSavePic);
        responseData(response, "Đã lưu ảnh!", "", 200);
        return;
      }
      await this.luuAnhRepository.remove(checkPicture);
      responseData(response, "Đã bỏ lưu ảnh!", "", 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getSavedPicturesByUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.params.userId;

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: +userId },
      });

      if (!user) {
        responseData(response, "User does not exist!", "", 400);
        return;
      }

      const savedPictures = await this.luuAnhRepository
        .createQueryBuilder("luuAnh")
        .leftJoinAndSelect("luuAnh.hinh", "hinh")
        .leftJoinAndSelect("hinh.nguoiDung", "nguoiDung")
        .select(["luuAnh", "hinh", "nguoiDung.nguoiDungId", "nguoiDung.hoTen", "nguoiDung.anhDaiDien", "nguoiDung.tuoi", "nguoiDung.email"])
        .where({
          nguoiDung: {
            nguoiDungId: userId,
          },
        })
        .getMany();

      if (savedPictures.length === 0) {
        responseData(response, "User does not have any pictures!", "", 400);
        return;
      }
      responseData(response, "Success", savedPictures, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async checkImageSaved(request: Request, response: Response, next: NextFunction) {
    try {
      const { pictureId } = request.params;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
      });

      if (!picture) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }

      const { token } = request.headers;

      if (!token || token == "" || token == null || token == undefined) {
        responseData(response, "Don't have token!", "", 400);
        return;
      }

      const accessToken = decodeToken(token);

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: accessToken.data.nguoiDungId },
      });

      if (!user) {
        responseData(response, "Token is not valid!", "", 401);
        return;
      }

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
      responseData(response, "Error ...", "", 500);
    }
  }
}
