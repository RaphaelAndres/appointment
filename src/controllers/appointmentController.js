const Appointment = require('../models/appointment');
const Patient = require('../models/patient');

exports.createAppointment = async (request, response) => {
    const { dataHora: appointmentTimestamp, paciente: { nome: name, cpf: documentNumber }} = request.body;
    const doctorId = request.userId;

    if (new Date(appointmentTimestamp) <= new Date()) {
        return response.status(400).json({ message: 'Cannot schedule in the past' });
    }

    const patientData = { name, documentNumber };

    let patientId;
    try {
        patientId = await Patient.create(patientData);
    } catch (error) {
        return response.status(500).json({ message: 'Error creating patient', error });
    }

    const appointmentData = { appointmentTimestamp, patientId, doctorId };

    try {
        const appointmentId = await Appointment.create(appointmentData);
        response.status(201).json({ id: appointmentId });
    } catch (error) {
        response.status(500).json({ message: 'Error creating appointment', error });
    }
};