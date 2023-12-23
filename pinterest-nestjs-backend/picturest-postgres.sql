CREATE DATABASE picturest;

CREATE TABLE nguoi_dung (
  nguoi_dung_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  mat_khau VARCHAR(255) NOT NULL,
  ho_ten VARCHAR(255) NOT NULL,
  tuoi INTEGER NOT NULL,
  anh_dai_dien VARCHAR(255)
);

INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES
  ('user1@example.com', 'password1', 'John Doe', 25, 'avatar1.jpg'),
  ('user2@example.com', 'password2', 'Jane Smith', 30, 'avatar2.jpg'),
  ('user3@example.com', 'password3', 'Bob Johnson', 22, 'avatar3.jpg');

CREATE TABLE hinh_anh (
  hinh_id SERIAL PRIMARY KEY,
  ten_hinh VARCHAR(255) NOT NULL,
  duong_dan VARCHAR(255) NOT NULL,
  mo_ta VARCHAR(255) NOT NULL,
  nguoi_dung_id INTEGER REFERENCES nguoi_dung(nguoi_dung_id)
);

INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES
  ('Image1', '/images/image1.jpg', 'Description for Image 1', 1),
  ('Image2', '/images/image2.jpg', 'Description for Image 2', 2),
  ('Image3', '/images/image3.jpg', 'Description for Image 3', 3);

CREATE TABLE luu_anh (
  luu_anh_id SERIAL PRIMARY KEY,
  nguoi_dung_id INTEGER REFERENCES nguoi_dung(nguoi_dung_id),
  hinh_id INTEGER REFERENCES hinh_anh(hinh_id),
  ngay_luu DATE NOT NULL
);

INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES
  (1, 1, '2023-01-01'::DATE),
  (2, 2, '2023-01-02'::DATE),
  (3, 3, '2023-01-03'::DATE);

CREATE TABLE binh_luan (
  binh_luan_id SERIAL PRIMARY KEY,
  nguoi_dung_id INTEGER REFERENCES nguoi_dung(nguoi_dung_id),
  hinh_id INTEGER REFERENCES hinh_anh(hinh_id),
  ngay_binh_luan DATE NOT NULL,
  noi_dung VARCHAR(255) NOT NULL
);

INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES
  (1, 1, '2023-01-01'::DATE, 'Great photo!'),
  (2, 2, '2023-01-02'::DATE, 'Nice shot!'),
  (3, 3, '2023-01-03'::DATE, 'Beautiful picture!');
