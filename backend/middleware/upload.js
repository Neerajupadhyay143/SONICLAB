import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        cb(null, 'uploads/audio/'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now}-${file.originalname}`);
    }
})

export const uploadAudio = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('audio/')) cb(null, true);
        else cb(new Error('please enter a audio file only'), false);

    }
})