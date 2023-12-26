import { AppDataSource } from "../data-source.js";
import { responseData } from "../config/Response.js";
import { BinhLuan } from "../entity/BinhLuan.js";
import { HinhAnh } from "../entity/HinhAnh.js";
import { decodeToken } from "../config/jwt.js";
import { NguoiDung } from "../entity/NguoiDung.js";
export class BinhLuanController {
  binhLuanRepository = AppDataSource.getRepository(BinhLuan);
  hinhAnhRepository = AppDataSource.getRepository(HinhAnh);
  nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async postComment(request, response, next) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
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

      if (!accessToken.data?.nguoiDungId) {
        responseData(response, "Token không hợp lệ", "", 401);
        return;
      }

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

  async getCommentsByPictureId(request, response, next) {
    try {
      const pictureId = request.params.pictureId;

      const picture = await this.hinhAnhRepository.findOne({
        where: { hinhId: +pictureId },
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
