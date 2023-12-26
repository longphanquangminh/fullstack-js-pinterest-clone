import { AppDataSource } from "../data-source.js";
import { responseData } from "../config/Response.js";
import { HinhAnh } from "../entity/HinhAnh.js";
import { NguoiDung } from "../entity/NguoiDung.js";
import { decodeToken } from "../config/jwt.js";

export class HinhAnhController {
  hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async postPicture(request, response, next) {
    try {
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
        responseData(response, "Token không hợp lệ!", "", 401);
        return;
      }
      const { moTa, tenHinh } = request.body;
      let file = request.file;
      // Object.assign(request.body, { tenHinh, moTa, nguoiDung: user });
      // console.log(request.body);
      console.log(file);
      // if (!file) {
      //   responseData(response, "Chưa thêm hình", "", 400);
      //   return;
      // }
      // await response.send(file.filename);
      const newPicture = Object.assign(new HinhAnh(), {
        moTa: "s",
        tenHinh: "s",
        duongDan: "s",
        nguoiDung: {
          nguoiDungId: 21,
        },
      });
      await this.hinhAnhRepository.save(newPicture);
      responseData(response, "Thêm hình thành công", newPicture, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async deletePicture(request, response, next) {
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
        responseData(response, "Không tìm thấy hình ảnh để xóa!", "", 400);
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

      if (!user || accessToken.data.nguoiDungId !== picture.nguoiDung.nguoiDungId) {
        responseData(response, "Token không hợp lệ!", "", 401);
        return;
      }

      await this.hinhAnhRepository.remove(picture);
      responseData(response, "Xóa thành công", "", 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getCreatedPicturesByUser(request, response, next) {
    try {
      const userId = request.params.userId;

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: +userId },
      });

      if (!user) {
        responseData(response, "Người dùng không tồn tại!", "", 400);
        return;
      }

      const createdPictures = await this.hinhAnhRepository
        .createQueryBuilder("hinhAnh")
        .leftJoinAndSelect("hinhAnh.nguoiDung", "nguoiDung")
        .where({
          nguoiDung: {
            nguoiDungId: userId,
          },
        })
        .getMany();

      if (createdPictures.length === 0) {
        responseData(response, "Người dùng chưa tạo ảnh nào!", "", 400);
        return;
      }
      responseData(response, "Thành công", createdPictures, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getPictures(request, response, next) {
    try {
      const data = await this.hinhAnhRepository.find();
      responseData(response, "Thành công", data, 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async getPicturesByName(request, response, next) {
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

  async getPicturesById(request, response, next) {
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
