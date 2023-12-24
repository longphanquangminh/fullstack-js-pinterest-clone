import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NguoiDung } from "./NguoiDung";
import { HinhAnh } from "./HinhAnh";

@Index("LUU_ANH_PK", ["luuAnhId"], { unique: true })
@Entity("LUU_ANH")
export class LuuAnh {
  @Column("date", { name: "NGAY_LUU" })
  ngayLuu: Date;

  @PrimaryGeneratedColumn({ type: "number", name: "LUU_ANH_ID" })
  luuAnhId: number;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.luuAnhs)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung: NguoiDung;

  @ManyToOne(() => HinhAnh, hinhAnh => hinhAnh.luuAnhs)
  @JoinColumn([{ name: "HINH_ID", referencedColumnName: "hinhId" }])
  hinh: HinhAnh;
}
