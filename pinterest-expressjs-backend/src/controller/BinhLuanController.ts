import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { BinhLuan } from "../entity/BinhLuan";
import { HinhAnh } from "../entity/HinhAnh";
import { decodeToken } from "../config/jwt";
import { NguoiDung } from "../entity/NguoiDung";
export class BinhLuanController {
  private binhLuanRepository = AppDataSource.getRepository(BinhLuan);
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async postComment(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: pictureId },
      });

      if (!picture) {
        responseData(response, "Không tìm thấy hình ảnh!", "", 400);
        return;
      }

      const { noiDung } = request.body;

      if (!noiDung) {
        responseData(response, "Chưa nhập nội dung bình luận", "", 400);
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

      if (!user) {
        responseData(response, "Không xác thực được người dùng!", "", 401);
        return;
      }

      const userComment = Object.assign(new BinhLuan(), {
        noiDung,
        ngayBinhLuan: new Date(),
        hinh: picture,
        nguoiDung: user,
      });

      await this.binhLuanRepository.save(userComment);
      responseData(response, "Bình luận thành công", "", 200);
      return;
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getCommentsByPictureId(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: pictureId },
      });

      if (!picture) {
        responseData(response, "Không tìm thấy hình ảnh!", "", 400);
        return;
      }

      const comments = await this.binhLuanRepository
        .createQueryBuilder("binhLuan")
        .leftJoinAndSelect("binhLuan.nguoiDung", "nguoiDung")
        .where({
          hinh: {
            hinhId: pictureId,
          },
        })
        .getMany();

      if (comments.length === 0) {
        responseData(response, "Chưa có bình luận!", "", 400);
        return;
      }
      responseData(response, "Thành công", comments, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
