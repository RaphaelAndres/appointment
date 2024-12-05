const express = require('express');
const { signup, login, logoff } = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logoff', authMiddleware, logoff);

module.exports = router;