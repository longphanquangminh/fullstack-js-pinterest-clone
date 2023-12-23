import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BinhLuan } from './BinhLuan';
import { NguoiDung } from './NguoiDung';
import { LuuAnh } from './LuuAnh';

@Index('hinh_anh_pkey', ['hinhId'], { unique: true })
@Entity('hinh_anh', { schema: 'public' })
export class HinhAnh {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'hinh_id' })
  hinhId: number;

  @Column('character varying', { name: 'ten_hinh', length: 255 })
  tenHinh: string;

  @Column('character varying', { name: 'duong_dan', length: 255 })
  duongDan: string;

  @Column('character varying', { name: 'mo_ta', length: 255 })
  moTa: string;

  @OneToMany(() => BinhLuan, (binhLuan) => binhLuan.hinh)
  binhLuans: BinhLuan[];

  @ManyToOne(() => NguoiDung, (nguoiDung) => nguoiDung.hinhAnhs)
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'nguoiDungId' }])
  nguoiDung: NguoiDung;

  @OneToMany(() => LuuAnh, (luuAnh) => luuAnh.hinh)
  luuAnhs: LuuAnh[];
}
