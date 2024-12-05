module.exports = function validate(documentNumber) {
    const documentNumberRegex = /^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!documentNumberRegex.test(documentNumber)) {
        throw new Error('Invalid document number format');
    }

    // this doesn't actually validate the CPF number, only checks for the length of the field.
    //I thought about adding the validation, but I sincerely believe this is not the point of the exercise,
    // also didn't find it amusing to use an external lib for this.
}