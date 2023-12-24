import multer from "multer";

let storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs", // nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname; // meo.jpeg
    // đổi tên hình
    callback(null, newName); // 17040023123_meo.jpeg
  },
});

let upload = multer({ storage });

export default upload;
