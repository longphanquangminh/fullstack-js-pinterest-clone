import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NguoiDung } from "./NguoiDung";
import { HinhAnh } from "./HinhAnh";

// @Index("BINH_LUAN_PK", ["binhLuanId"], { unique: true })
@Entity("BINH_LUAN")
export class BinhLuan {
  @Column("date", { name: "NGAY_BINH_LUAN" })
  ngayBinhLuan: Date;

  @Column("varchar2", { name: "NOI_DUNG", length: 255 })
  noiDung: string;

  @PrimaryGeneratedColumn({ type: "number", name: "BINH_LUAN_ID" })
  binhLuanId: number;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.binhLuans)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung: NguoiDung;

  @ManyToOne(() => HinhAnh, hinhAnh => hinhAnh.binhLuans)
  @JoinColumn([{ name: "HINH_ID", referencedColumnName: "hinhId" }])
  hinh: HinhAnh;
}