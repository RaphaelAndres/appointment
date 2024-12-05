const emailValidator = require('../src/controllers/validators/emailValidator');
const brazilianDocumentValidator = require('../src/controllers/validators/brazilianDocumentValidator');
const birthDateValidator = require('../src/controllers/validators/birthDateValidator');
const phoneNumberValidator = require('../src/controllers/validators/phoneNumberValidator');

describe('Validators', () => {
    describe('Email Validator', () => {
        test.each([
            ['valid email', 'test@example.com', true],
            ['invalid email without @', 'testexample.com', false],
            ['invalid email without domain', 'test@.com', false],
            ['invalid email without TLD', 'test@example', false],
        ])('%s', (description, email, isValid) => {
            if (isValid) {
                expect(() => emailValidator(email)).not.toThrow();
            } else {
                expect(() => emailValidator(email)).toThrow('Invalid email format');
            }
        });
    });

    describe('Brazilian Document Validator', () => {
        test.each([
            ['valid CPF with dots and dash', '101.202.303-11', true],
            ['valid CPF without dots and dash', '10120230311', true],
            ['invalid CPF with incorrect length', '101.202.303-1', false],
            ['invalid CPF with letters', '101.202.303-AA', false],
        ])('%s', (description, documentNumber, isValid) => {
            if (isValid) {
                expect(() => brazilianDocumentValidator(documentNumber)).not.toThrow();
            } else {
                expect(() => brazilianDocumentValidator(documentNumber)).toThrow('Invalid document number format');
            }
        });
    });

    describe('Birth Date Validator', () => {
        test.each([
            ['valid birth date with dashes', '1980-03-10', true],
            ['valid birth date with slashes', '1980/03/10', true],
            ['invalid birth date with incorrect format', '10-03-1980', false],
            ['invalid birth date with letters', '1980-03-AA', false],
        ])('%s', (description, birthDate, isValid) => {
            if (isValid) {
                expect(() => birthDateValidator(birthDate)).not.toThrow();
            } else {
                expect(() => birthDateValidator(birthDate)).toThrow('Invalid birth date format');
            }
        });
    });

    describe('Phone Number Validator', () => {
        test.each([
            ['valid phone number with area code', '(21) 3232-6565', true],
            ['valid phone number without area code', '3232-6565', true],
            ['valid phone number with 9 digits', '(21) 93232-6565', true],
            ['invalid phone number with letters', '(21) 3232-AAAA', false],
            ['invalid phone number with incorrect format', '21 3232-6565', false],
        ])('%s', (description, phoneNumber, isValid) => {
            if (isValid) {
                expect(() => phoneNumberValidator(phoneNumber)).not.toThrow();
            } else {
                expect(() => phoneNumberValidator(phoneNumber)).toThrow('Invalid phone number format');
            }
        });
    });
});