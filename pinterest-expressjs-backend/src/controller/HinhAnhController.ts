import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { HinhAnh } from "../entity/HinhAnh";
import { Like } from "typeorm";
export class HinhAnhController {
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);

  async getPictures(request: Request, response: Response, next: NextFunction) {
    const data = await this.hinhAnhRepository.find();
    responseData(response, "Thành công", data, 200);
  }

  async getPicturesByName(request: Request, response: Response, next: NextFunction) {
    const pictureName = request.params.pictureName;

    const queryPictures = await this.hinhAnhRepository
      .createQueryBuilder("hinh_anh")
      .where("LOWER(ten_hinh) LIKE LOWER(:ten_hinh)", { ten_hinh: `%${pictureName.toLowerCase()}%` })
      .getMany();

    if (queryPictures.length <= 0 || !queryPictures) {
      responseData(response, "Khong tim thay hinh anh nao!", "", 400);
      return;
    }
    responseData(response, "Thành công", queryPictures, 200);
  }
}
