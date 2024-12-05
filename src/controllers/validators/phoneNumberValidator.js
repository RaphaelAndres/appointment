module.exports = function validate(phoneNumber) {
    const phoneNumberRegex = /^(\(\d{2}\)\s?)?\d{4,5}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
        throw new Error('Invalid phone number format');
    }
}