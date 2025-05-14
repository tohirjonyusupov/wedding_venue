const multer = require('multer');

const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls eski excel
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx yangi excel
    'application/vnd.ms-powerpoint', // .ppt eski powerpoint
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx yangi powerpoint
];



const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG, JPEG, WEBP, PDF, and DOC  images are allowed'), false);
    }
};

const upload = multer({
    storage: uploadStorage,
    fileFilter,
});

const uploadMiddleware = upload.single('file');

module.exports = uploadMiddleware;
