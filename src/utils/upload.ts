import express from "express";
import multer from "multer";
import { putObjectToS3 } from "./s3Client";

const router = express.Router();

const upload = multer();
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const file = req.file;
    const fileName = file.originalname;
    const { key, url } = await putObjectToS3(
      file.buffer,
      fileName,
      file.mimetype
    );
    return res.json({ key, url });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed", detail: err });
  }
});
export default router;

// `uploads/${Date.now()}-${file.originalname}`
