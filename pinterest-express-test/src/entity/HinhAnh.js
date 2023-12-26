import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BinhLuan } from "./BinhLuan.js";
import { NguoiDung } from "./NguoiDung.js";
import { LuuAnh } from "./LuuAnh.js";

@Entity("HINH_ANH")
export class HinhAnh {
  @Column("varchar2", { name: "MO_TA", length: 255 })
  moTa;

  @PrimaryGeneratedColumn({ type: "number", name: "HINH_ID" })
  hinhId;

  @Column("varchar2", { name: "DUONG_DAN", length: 255 })
  duongDan;

  @Column("varchar2", { name: "TEN_HINH", length: 255 })
  tenHinh;

  @OneToMany(() => BinhLuan, binhLuan => binhLuan.hinh)
  binhLuans;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.hinhAnhs)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung;

  @OneToMany(() => LuuAnh, luuAnh => luuAnh.hinh)
  luuAnhs;
}
