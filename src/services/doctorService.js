const Doctor = require('../models/doctor');

class DoctorService {
    static async create(data) {
        const doctor = await Doctor.create(data);
        return doctor.id;
    }

    static async findByEmail(email) {
        return await Doctor.findOne({
            where: {email},
        });
    }
}

module.exports = DoctorService;