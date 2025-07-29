const express = require('express');
const router = express.Router();
const { handleMessage, config } = require('../controllers/chatController');

router.post('/webhook', handleMessage);
router.get('/webhook', config);

module.exports = router;