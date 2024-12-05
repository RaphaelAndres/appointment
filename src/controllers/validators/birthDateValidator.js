module.exports = function validate(birthDate) {
    const birthDateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
        throw new Error('Invalid birth date format');
    }
}