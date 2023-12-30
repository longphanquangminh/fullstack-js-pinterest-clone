import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { BinhLuan } from "../entity/BinhLuan";
import { HinhAnh } from "../entity/HinhAnh";
import { decodeToken } from "../config/jwt";
import { NguoiDung } from "../entity/NguoiDung";
import { validate } from "class-validator";
export class BinhLuanController {
  private binhLuanRepository = AppDataSource.getRepository(BinhLuan);
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async postComment(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
      });

      if (!picture) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }

      const { noiDung } = request.body;

      if (!noiDung) {
        responseData(response, "No comment data!", "", 400);
        return;
      }

      const { token } = request.headers;

      if (!token || token == "" || token == null || token == undefined) {
        responseData(response, "Don't have token!", "", 400);
        return;
      }

      const accessToken = decodeToken(token);

      if (!accessToken.data?.nguoiDungId) {
        responseData(response, "Token is not valid!", "", 401);
        return;
      }

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: accessToken.data.nguoiDungId },
      });

      if (!user) {
        responseData(response, "Can't auth user!", "", 401);
        return;
      }

      const userComment = Object.assign(new BinhLuan(), {
        noiDung,
        ngayBinhLuan: new Date(),
        hinh: picture,
        nguoiDung: user,
      });

      const errors = await validate(userComment, { validationError: { target: false } });
      if (errors.length > 0) {
        responseData(response, "Input error!", errors, 400);
        return;
      }

      await this.binhLuanRepository.save(userComment);
      responseData(response, "Comment successfully!", "", 200);
      return;
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getCommentsByPictureId(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
      });

      if (!picture) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }
      const comments = await this.binhLuanRepository
        .createQueryBuilder("binhLuan")
        .leftJoinAndSelect("binhLuan.nguoiDung", "nguoiDung")
        .select(["binhLuan", "nguoiDung.nguoiDungId", "nguoiDung.hoTen", "nguoiDung.anhDaiDien", "nguoiDung.tuoi", "nguoiDung.email"])
        .where({
          hinh: {
            hinhId: pictureId,
          },
        })
        .getMany();

      if (comments.length === 0) {
        responseData(response, "No comments!", "", 400);
        return;
      }
      responseData(response, "Success", comments, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }
}
