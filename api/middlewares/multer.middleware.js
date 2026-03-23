const multer = require("multer")

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
        cb(null, '../../client/public/user_images')
    },
    filename: (req, file, cb) => {
        const extension = MIME_TYPES[file.mimetype]
        const uniquePrefix = 'image-user-' + req.body.username || 'unknown'
        const uniqueSuffix = 'upload-time-' + Date.now()
        cb(null, uniquePrefix + uniqueSuffix + '.' + extension)
    }
})

const upload = multer({storage: storage})

module.exports = upload