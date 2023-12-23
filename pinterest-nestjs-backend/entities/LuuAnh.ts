import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HinhAnh } from './HinhAnh';
import { NguoiDung } from './NguoiDung';

@Index('luu_anh_pkey', ['luuAnhId'], { unique: true })
@Entity('luu_anh', { schema: 'public' })
export class LuuAnh {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'luu_anh_id' })
  luuAnhId: number;

  @Column('date', { name: 'ngay_luu' })
  ngayLuu: string;

  @ManyToOne(() => HinhAnh, (hinhAnh) => hinhAnh.luuAnhs)
  @JoinColumn([{ name: 'hinh_id', referencedColumnName: 'hinhId' }])
  hinh: HinhAnh;

  @ManyToOne(() => NguoiDung, (nguoiDung) => nguoiDung.luuAnhs)
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'nguoiDungId' }])
  nguoiDung: NguoiDung;
}
