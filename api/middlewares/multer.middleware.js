const multer = require("multer")
const path = require("path");

const MIME_TYPES = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpeg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/avif': 'avif',
    'image/webp': 'webp'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../client/public/user_images'))
    },
    filename: (req, file, cb) => {
        const extension = MIME_TYPES[file.mimetype];
        const filename = `user-${Date.now()}-image.${extension}`;
        cb(null, filename);
    }
})

const upload = multer({storage: storage})

module.exports = upload