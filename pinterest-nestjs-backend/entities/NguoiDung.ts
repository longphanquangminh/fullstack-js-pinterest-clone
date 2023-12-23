import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BinhLuan } from './BinhLuan';
import { HinhAnh } from './HinhAnh';
import { LuuAnh } from './LuuAnh';

@Index('nguoi_dung_pkey', ['nguoiDungId'], { unique: true })
@Entity('nguoi_dung', { schema: 'public' })
export class NguoiDung {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'nguoi_dung_id' })
  nguoiDungId: number;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('character varying', { name: 'mat_khau', length: 255 })
  matKhau: string;

  @Column('character varying', { name: 'ho_ten', length: 255 })
  hoTen: string;

  @Column('integer', { name: 'tuoi' })
  tuoi: number;

  @Column('character varying', {
    name: 'anh_dai_dien',
    nullable: true,
    length: 255,
  })
  anhDaiDien: string | null;

  @OneToMany(() => BinhLuan, (binhLuan) => binhLuan.nguoiDung)
  binhLuans: BinhLuan[];

  @OneToMany(() => HinhAnh, (hinhAnh) => hinhAnh.nguoiDung)
  hinhAnhs: HinhAnh[];

  @OneToMany(() => LuuAnh, (luuAnh) => luuAnh.nguoiDung)
  luuAnhs: LuuAnh[];
}
