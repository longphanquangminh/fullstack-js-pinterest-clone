import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { HinhAnh } from "../entity/HinhAnh";
export class HinhAnhController {
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);

  async getPictures(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await this.hinhAnhRepository.find();
      responseData(response, "Thành công", data, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getPicturesByName(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureName = request.params.pictureName;

      const queryPictures = await this.hinhAnhRepository
        .createQueryBuilder("hinh_anh")
        .where("LOWER(ten_hinh) LIKE LOWER(:ten_hinh)", { ten_hinh: `%${pictureName.toLowerCase()}%` })
        .leftJoinAndSelect("hinh_anh.nguoiDung", "nguoiDung")
        .getMany();

      if (queryPictures.length === 0) {
        responseData(response, "Không tìm thấy hình ảnh nào!", "", 400);
        return;
      }
      responseData(response, "Thành công", queryPictures, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getPicturesById(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: {
          hinhId: pictureId,
        },
        relations: {
          nguoiDung: true,
        },
      });

      if (!picture) {
        responseData(response, "Không tìm thấy hình ảnh!", "", 400);
        return;
      }
      responseData(response, "Thành công", picture, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
