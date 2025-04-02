const express = require('express');
const { processScore } = require('../controllers/videoControllers');

const router = express.Router();
router.post('/process', processScore);

module.exports = router;
