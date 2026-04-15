import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const ip = req.ip.replace(/[:.]/g, "_"); // clean IPv4/IPv6
    const filename = `${ip}-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

export default upload;