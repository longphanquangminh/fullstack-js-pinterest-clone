import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsOptional, IsString, MaxLength, IsEmail } from "class-validator";

import { BinhLuan } from "./BinhLuan";
import { HinhAnh } from "./HinhAnh";
import { LuuAnh } from "./LuuAnh";

@Entity("NGUOI_DUNG")
export class NguoiDung {
  @IsNumber()
  @PrimaryGeneratedColumn({ type: "number", name: "NGUOI_DUNG_ID" })
  nguoiDungId: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Column("varchar2", { name: "ANH_DAI_DIEN", nullable: true, length: 255 })
  anhDaiDien: string | null;

  @IsNumber()
  @Column("number", { name: "TUOI" })
  tuoi: number;

  @IsString()
  @MaxLength(255)
  @Column("varchar2", { name: "MAT_KHAU", length: 255 })
  matKhau: string;

  @IsString()
  @MaxLength(255)
  @Column("varchar2", { name: "HO_TEN", length: 255 })
  hoTen: string;

  @IsEmail()
  @MaxLength(255)
  @Column("varchar2", { name: "EMAIL", length: 255 })
  email: string;

  @OneToMany(() => BinhLuan, binhLuan => binhLuan.nguoiDung)
  binhLuans: BinhLuan[];

  @OneToMany(() => HinhAnh, hinhAnh => hinhAnh.nguoiDung)
  hinhAnhs: HinhAnh[];

  @OneToMany(() => LuuAnh, luuAnh => luuAnh.nguoiDung)
  luuAnhs: LuuAnh[];
}
