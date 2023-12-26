import { AppDataSource } from "../data-source.js";
import { responseData } from "../config/Response.js";
import { LuuAnh } from "../entity/LuuAnh.js";
import { HinhAnh } from "../entity/HinhAnh.js";
import { NguoiDung } from "../entity/NguoiDung.js";
import { decodeToken } from "../config/jwt.js";
export class LuuAnhController {
  luuAnhRepository = AppDataSource.getRepository(LuuAnh);
  hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async getSavedPicturesByUser(request, response, next) {
    try {
      const userId = request.params.userId;

      const user = await this.nguoiDungRepository.findOne({
        where: { nguoiDungId: +userId },
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

  async checkImageSaved(request, response, next) {
    try {
      const { pictureId } = request.params;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
      });

      if (!picture) {
        responseData(response, "Không tìm thấy hình ảnh!", "", 400);
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
        responseData(response, "Token không hợp lệ!", "", 401);
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
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
