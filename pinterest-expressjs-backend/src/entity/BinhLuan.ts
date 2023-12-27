import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNotEmpty, IsString, MaxLength, IsNumber } from "class-validator";
import { NguoiDung } from "./NguoiDung";
import { HinhAnh } from "./HinhAnh";

@Entity("BINH_LUAN")
export class BinhLuan {
  @IsDate()
  @Column("date", { name: "NGAY_BINH_LUAN" })
  ngayBinhLuan: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
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
