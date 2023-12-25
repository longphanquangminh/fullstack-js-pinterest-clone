import multer from "multer";

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs", // nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    const newName = new Date().getTime() + "_" + file.originalname; // meo.jpeg
    // đổi tên hình
    callback(null, newName); // 17040023123_meo.jpeg
  },
});

const upload = multer({ storage });

export default upload;
