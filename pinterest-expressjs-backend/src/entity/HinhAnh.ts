import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BinhLuan } from "./BinhLuan";
import { NguoiDung } from "./NguoiDung";
import { LuuAnh } from "./LuuAnh";

@Entity("HINH_ANH")
export class HinhAnh {
  @Column("varchar2", { name: "MO_TA", length: 255 })
  moTa: string;

  @PrimaryGeneratedColumn({ type: "number", name: "HINH_ID" })
  hinhId: number;

  @Column("varchar2", { name: "DUONG_DAN", length: 255 })
  duongDan: string;

  @Column("varchar2", { name: "TEN_HINH", length: 255 })
  tenHinh: string;

  @OneToMany(() => BinhLuan, binhLuan => binhLuan.hinh)
  binhLuans: BinhLuan[];

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.hinhAnhs)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung: NguoiDung;

  @OneToMany(() => LuuAnh, luuAnh => luuAnh.hinh)
  luuAnhs: LuuAnh[];
}
