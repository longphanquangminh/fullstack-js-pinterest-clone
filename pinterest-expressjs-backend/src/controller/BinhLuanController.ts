import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { BinhLuan } from "../entity/BinhLuan";
import { HinhAnh } from "../entity/HinhAnh";
export class BinhLuanController {
  private binhLuanRepository = AppDataSource.getRepository(BinhLuan);
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);

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
