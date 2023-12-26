import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BinhLuan } from "./BinhLuan.js";
import { HinhAnh } from "./HinhAnh.js";
import { LuuAnh } from "./LuuAnh.js";

@Entity("NGUOI_DUNG")
export class NguoiDung {
  @PrimaryGeneratedColumn({ type: "number", name: "NGUOI_DUNG_ID" })
  nguoiDungId;

  @Column("varchar2", { name: "ANH_DAI_DIEN", nullable: true, length: 255 })
  anhDaiDien;

  @Column("number", { name: "TUOI" })
  tuoi;

  @Column("varchar2", { name: "MAT_KHAU", length: 255 })
  matKhau;

  @Column("varchar2", { name: "HO_TEN", length: 255 })
  hoTen;

  @Column("varchar2", { name: "EMAIL", length: 255 })
  email;

  @OneToMany(() => BinhLuan, binhLuan => binhLuan.nguoiDung)
  binhLuans;

  @OneToMany(() => HinhAnh, hinhAnh => hinhAnh.nguoiDung)
  hinhAnhs;

  @OneToMany(() => LuuAnh, luuAnh => luuAnh.nguoiDung)
  luuAnhs;
}
