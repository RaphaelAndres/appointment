const emailValidator = require('../controllers/validators/emailValidator');
const brazilianDocumentValidator = require('../controllers/validators/brazilianDocumentValidator');
const birthDateValidator = require('../controllers/validators/birthDateValidator');
const phoneNumberValidator = require('../controllers/validators/phoneNumberValidator');

const validateSignup = (req, res, next) => {
    const { email, cpf: documentNumber, dataNascimento: birthDate, telefone: phoneNumber } = req.body;

    try {
        emailValidator(email);
        brazilianDocumentValidator(documentNumber);
        birthDateValidator(birthDate);
        phoneNumberValidator(phoneNumber);
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { validateSignup };