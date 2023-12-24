import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BinhLuan } from "./BinhLuan";
import { HinhAnh } from "./HinhAnh";
import { LuuAnh } from "./LuuAnh";

@Index("NGUOI_DUNG_PK", ["nguoiDungId"], { unique: true })
@Entity("NGUOI_DUNG")
export class NguoiDung {
  @PrimaryGeneratedColumn({ type: "number", name: "NGUOI_DUNG_ID" })
  nguoiDungId: number;

  @Column("varchar2", { name: "ANH_DAI_DIEN", nullable: true, length: 255 })
  anhDaiDien: string | null;

  @Column("number", { name: "TUOI" })
  tuoi: number;

  @Column("varchar2", { name: "MAT_KHAU", length: 255 })
  matKhau: string;

  @Column("varchar2", { name: "HO_TEN", length: 255 })
  hoTen: string;

  @Column("varchar2", { name: "EMAIL", length: 255 })
  email: string;

  @OneToMany(() => BinhLuan, binhLuan => binhLuan.nguoiDung)
  binhLuans: BinhLuan[];

  @OneToMany(() => HinhAnh, hinhAnh => hinhAnh.nguoiDung)
  hinhAnhs: HinhAnh[];

  @OneToMany(() => LuuAnh, luuAnh => luuAnh.nguoiDung)
  luuAnhs: LuuAnh[];
}
