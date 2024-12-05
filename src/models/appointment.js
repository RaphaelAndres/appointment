const pool = require('../config/database');

class Appointment {
    static async create(data) {
        const [result] = await pool.query('INSERT INTO appointments SET ?', data);
        return result.insertId;
    }
}

module.exports = Appointment;