import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NguoiDung } from "./NguoiDung.js";
import { HinhAnh } from "./HinhAnh.js";

@Entity("LUU_ANH")
export class LuuAnh {
  @Column("date", { name: "NGAY_LUU" })
  ngayLuu;

  @PrimaryGeneratedColumn({ type: "number", name: "LUU_ANH_ID" })
  luuAnhId;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.luuAnhs)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung;

  @ManyToOne(() => HinhAnh, hinhAnh => hinhAnh.luuAnhs)
  @JoinColumn([{ name: "HINH_ID", referencedColumnName: "hinhId" }])
  hinh;
}
