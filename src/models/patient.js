const pool = require('../config/database');

class Patient {
    static async create(data) {
        const [result] = await pool.query('INSERT INTO patients SET ?', data);
        return result.insertId;
    }
}

module.exports = Patient;