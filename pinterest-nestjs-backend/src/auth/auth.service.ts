import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NguoiDung } from 'src/entities/NguoiDung';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(NguoiDung)
    private usersRepository: Repository<NguoiDung>,
  ) {}
  login() {
    return 'This action returns all auth';
  }
  async signup(email, matKhau, hoTen, tuoi, anhDaiDien) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
      if (existingUser) {
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await bcrypt.hash(matKhau, 10);
      const newUser = {
        email,
        mat_khau: hashedPassword,
        ho_ten: hoTen,
        tuoi,
        anh_dai_dien: anhDaiDien,
      };
      await this.usersRepository.save(newUser);
      return { message: 'Đăng ký thành công' };
    } catch (exception) {
      if (exception.status !== 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException('Lỗi ...', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
