// lib/multer.ts
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

export const multerUpload = multer({
	storage: multer.diskStorage({
		destination: (_, __, cb) => cb(null, uploadDir),
		filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
	})
});
