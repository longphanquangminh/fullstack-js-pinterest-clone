import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { responseData } from "../config/Response";
import { HinhAnh } from "../entity/HinhAnh";
import { NguoiDung } from "../entity/NguoiDung";
import { decodeToken } from "../config/jwt";
import upload from "../config/upload";
import { validate } from "class-validator";

export class HinhAnhController {
  private hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  private nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async postPicture(request: Request, response: Response, next: NextFunction) {
    try {
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
      const file = request.file;

      if (!file) {
        // Handle missing file
        responseData(response, "Missing image file!", "", 400);
        return;
      }

      const { moTa, tenHinh } = request.body;
      if (!moTa) {
        responseData(response, "Missing image description!", "", 400);
        return;
      }
      if (!tenHinh) {
        responseData(response, "Missing image name!", "", 400);
        return;
      }
      const newPicture = Object.assign(new HinhAnh(), {
        moTa,
        tenHinh,
        duongDan: file.filename,
        nguoiDung: {
          nguoiDungId: accessToken.data.nguoiDungId,
        },
      });

      const errors = await validate(newPicture, { validationError: { target: false } });
      if (errors.length > 0) {
        responseData(response, "Input error!", errors, 400);
        return;
      }

      await this.hinhAnhRepository.save(newPicture);

      responseData(response, "Add image successfully!", "", 200);
      return;
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async deletePicture(request: Request, response: Response, next: NextFunction) {
    try {
      const { pictureId } = request.params;
      const picture = await this.hinhAnhRepository.findOne({
        where: {
          hinhId: +pictureId,
        },
        relations: {
          nguoiDung: true,
        },
      });
      if (!picture) {
        responseData(response, "Can't find image to delete!", "", 400);
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

      if (!user || accessToken.data.nguoiDungId !== picture.nguoiDung.nguoiDungId) {
        responseData(response, "Token is not valid!", "", 401);
        return;
      }

      await this.hinhAnhRepository.remove(picture);
      responseData(response, "Delete successfully!", "", 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getCreatedPicturesByUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.params.userId;

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: +userId },
      });

      if (!user) {
        responseData(response, "User does not exist!", "", 400);
        return;
      }

      const createdPictures = await this.hinhAnhRepository
        .createQueryBuilder("hinhAnh")
        .leftJoinAndSelect("hinhAnh.nguoiDung", "nguoiDung")
        .select(["hinhAnh", "nguoiDung.nguoiDungId", "nguoiDung.hoTen", "nguoiDung.anhDaiDien", "nguoiDung.tuoi", "nguoiDung.email"])
        .where({
          nguoiDung: {
            nguoiDungId: userId,
          },
        })
        .getMany();

      if (createdPictures.length === 0) {
        responseData(response, "User does not have any pictures!", "", 400);
        return;
      }
      responseData(response, "Success", createdPictures, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getPictures(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await this.hinhAnhRepository
        .createQueryBuilder("hinh_anh")
        .orderBy("hinh_anh.hinhId", "DESC")
        .leftJoinAndSelect("hinh_anh.nguoiDung", "nguoiDung")
        .select(["hinh_anh", "nguoiDung.nguoiDungId", "nguoiDung.hoTen", "nguoiDung.anhDaiDien", "nguoiDung.tuoi", "nguoiDung.email"])
        .getMany();
      const count = await this.hinhAnhRepository.count();
      responseData(response, "Success", { count, data }, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getPicturesByName(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureName = request.params.pictureName;

      const [data, count] = await this.hinhAnhRepository
        .createQueryBuilder("hinh_anh")
        .orderBy("hinh_anh.hinhId", "DESC")
        .where("LOWER(ten_hinh) LIKE LOWER(:ten_hinh)", { ten_hinh: `%${pictureName.toLowerCase()}%` })
        .leftJoinAndSelect("hinh_anh.nguoiDung", "nguoiDung")
        .select(["hinh_anh", "nguoiDung.nguoiDungId", "nguoiDung.hoTen", "nguoiDung.anhDaiDien", "nguoiDung.tuoi", "nguoiDung.email"])
        .getManyAndCount();

      if (data.length === 0) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }
      responseData(response, "Success", { count, data }, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }

  async getPicturesById(request: Request, response: Response, next: NextFunction) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: {
          hinhId: +pictureId,
        },
        relations: {
          nguoiDung: true,
        },
      });
      delete picture.nguoiDung.matKhau;

      if (!picture) {
        responseData(response, "Can't find image!", "", 400);
        return;
      }
      responseData(response, "Success", picture, 200);
    } catch {
      responseData(response, "Error ...", "", 500);
    }
  }
}
