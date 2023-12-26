import { AppDataSource } from "../data-source.js";
import { NguoiDung } from "../entity/NguoiDung.js";
import { responseData } from "../config/Response.js";
import bcrypt from "bcrypt";
import { createToken } from "../config/jwt.js";
export class AuthController {
  nguoiDungRepository = AppDataSource.getRepository(NguoiDung);

  async register(request, response, next) {
    try {
      const { anhDaiDien, tuoi, matKhau, hoTen, email } = request.body;

      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });
      if (checkUser) {
        responseData(response, "Email đã tồn tại", "", 400);
        return;
      }
      const user = Object.assign(new NguoiDung(), {
        anhDaiDien: anhDaiDien ?? null,
        tuoi,
        matKhau: bcrypt.hashSync(matKhau, 10),
        hoTen,
        email,
      });
      await this.nguoiDungRepository.save(user);
      responseData(response, "Đăng ký thành công", "", 200);
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }

  async login(request, response, next) {
    try {
      const { email, matKhau } = request.body;
      const checkUser = await this.nguoiDungRepository.findOneBy({
        email,
      });
      if (checkUser) {
        if (bcrypt.compareSync(matKhau, checkUser.matKhau)) {
          const key = new Date().getTime();
          const token = createToken({
            nguoiDungId: checkUser.nguoiDungId,
            key,
          });
          responseData(response, "Đăng nhập thành công", { token }, 200);
        } else {
          responseData(response, "Mật khẩu không đúng", "", 400);
        }
      } else {
        responseData(response, "Email không đúng", "", 400);
      }
    } catch {
      responseData(response, "Lỗi ...", "", 500);
    }
  }
}
