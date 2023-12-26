import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NguoiDung } from "./NguoiDung.js";
import { HinhAnh } from "./HinhAnh.js";

@Entity("BINH_LUAN")
export class BinhLuan {
  @Column("date", { name: "NGAY_BINH_LUAN" })
  ngayBinhLuan;

  @Column("varchar2", { name: "NOI_DUNG", length: 255 })
  noiDung;

  @PrimaryGeneratedColumn({ type: "number", name: "BINH_LUAN_ID" })
  binhLuanId;

  @ManyToOne(() => NguoiDung, nguoiDung => nguoiDung.binhLuans)
  @JoinColumn([{ name: "NGUOI_DUNG_ID", referencedColumnName: "nguoiDungId" }])
  nguoiDung;

  @ManyToOne(() => HinhAnh, hinhAnh => hinhAnh.binhLuans)
  @JoinColumn([{ name: "HINH_ID", referencedColumnName: "hinhId" }])
  hinh;
}
