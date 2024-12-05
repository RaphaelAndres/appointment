const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const { secret, expiresIn } = require('../config/jwtConfig');
const redisClient = require("../redisClient");

exports.signup = async (request, response) => {
    const { email, senha: password, confirmacaoSenha: passwordConfirmation, especialidade: specialty, cpf: documentNumber, dataNascimento: birthDate, telefone: phoneNumber } = request.body;

    if (password !== passwordConfirmation) {
        return response.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const doctorData = { email, hashedPassword, specialty, documentNumber, birthDate, phoneNumber };

    try {
        const doctorId = await Doctor.create(doctorData);
        response.status(201).json({ id: doctorId });
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'Error creating doctor', error });
    }
};

exports.login = async (request, response) => {
    const { email, senha: password } = request.body;

    try {
        const doctor = await Doctor.findByEmail(email);
        if (!doctor || !(await bcryptjs.compare(password, doctor.hashedPassword))) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: doctor.id }, secret, { expiresIn });
        response.status(200).json({ token });
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'Error logging in', error });
    }
};

exports.logoff = async (request, response) => {
    const token = request.token;
    const expirationTime = 60 * 60;

    try {
        await redisClient.setEx(token, expirationTime, 'blacklisted');
        response.status(200).json({ message: 'Logged off successfully' });
    } catch (err) {
        response.status(500).json({ message: 'Failed to log off' });
    }
};
