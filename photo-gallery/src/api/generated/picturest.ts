export type nguoiDung = {
  nguoiDungId: number;
  anhDaiDien: string;
  tuoi: number;
  hoTen: string;
  email: string;
  matKhau?: string;
};

export type hinhAnh = {
  moTa: string;
  hinhId: number;
  duongDan: string;
  tenHinh: string;
  nguoiDung: nguoiDung;
};
