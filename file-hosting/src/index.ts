import express from "express";
import multer from "multer";
import fs from "fs";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

const app = express();

// Servir les fichiers (lecture)
app.use(express.static(PUBLIC_DIR));

// Permettre l'envoi de fichiers (écriture)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/", upload.single("file"), (req, res) => {
  return res.status(201).json({
    filename: req.file?.filename,
  });
});
app.use(express.static("public"));

app.listen(5001, () => {
  console.log("File hosting server listening on port 5001.");
});
