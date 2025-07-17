const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadJSON } = require('../controllers/reportController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadJSON);

module.exports = router;
