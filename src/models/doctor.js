const pool = require('../config/database');

class Doctor {
    static async create(data) {
        const [result] = await pool.query('INSERT INTO doctors SET ?', data);
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM doctors WHERE email = ?', [email]);
        return rows[0];
    }
}

module.exports = Doctor;