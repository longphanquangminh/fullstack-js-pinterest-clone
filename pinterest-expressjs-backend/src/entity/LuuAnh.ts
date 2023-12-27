import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNumber } from "class-validator";

import { NguoiDung } from "./NguoiDung";
import { HinhAnh } from "./HinhAnh";

@Entity("LUU_ANH")
export class LuuAnh {
  @IsDate()
  @Column("date", { name: "NGAY_LUU" })
  ngayLuu: Date;

  @IsNumber()
  @PrimaryGeneratedColumn({ type: "number", name: "LUU_ANH_ID" })
  luuAnhId: number;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.luuAnhs)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung: NguoiDung;

  @ManyToOne(() => HinhAnh, hinhAnh => hinhAnh.luuAnhs)
  @JoinColumn([{ name: "HINH_ID", referencedColumnName: "hinhId" }])
  hinh: HinhAnh;
}
