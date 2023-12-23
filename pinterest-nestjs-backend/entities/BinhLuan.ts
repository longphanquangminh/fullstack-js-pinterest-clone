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

@Index('binh_luan_pkey', ['binhLuanId'], { unique: true })
@Entity('binh_luan', { schema: 'public' })
export class BinhLuan {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'binh_luan_id' })
  binhLuanId: number;

  @Column('date', { name: 'ngay_binh_luan' })
  ngayBinhLuan: string;

  @Column('character varying', { name: 'noi_dung', length: 255 })
  noiDung: string;

  @ManyToOne(() => HinhAnh, (hinhAnh) => hinhAnh.binhLuans)
  @JoinColumn([{ name: 'hinh_id', referencedColumnName: 'hinhId' }])
  hinh: HinhAnh;

  @ManyToOne(() => NguoiDung, (nguoiDung) => nguoiDung.binhLuans)
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'nguoiDungId' }])
  nguoiDung: NguoiDung;
}
