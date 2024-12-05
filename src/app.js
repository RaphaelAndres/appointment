const express = require('express');
const session = require("express-session");
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());
app.use('/api/v1', authRoutes);
app.use('/api/v1', appointmentRoutes);

module.exports = app;