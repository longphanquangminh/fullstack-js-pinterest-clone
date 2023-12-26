import * as multer from "multer";

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs",
  filename: (req, file, callback) => {
    const newName = new Date().getTime() + "_" + file.originalname;
    callback(null, newName);
  },
});

const upload = multer({ storage });

export default upload;
