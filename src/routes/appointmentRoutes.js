const express = require('express');
const { createAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/appointment', authMiddleware, createAppointment);

module.exports = router;