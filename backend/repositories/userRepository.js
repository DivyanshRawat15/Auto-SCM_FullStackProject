const { query } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: async (name, email, password, role = 'USER') => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        return query(sql, [name, email, hashedPassword, role]);
    },

    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const results = await query(sql, [email]);
        return results[0];
    },

    findById: async (id) => {
        const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
        const results = await query(sql, [id]);
        return results[0];
    },

    getAll: async () => {
        const sql = 'SELECT id, name, email, role, created_at FROM users';
        return query(sql);
    },

    getPreferences: async (id) => {
        const sql = 'SELECT preferred_fuel, budget_limit FROM user_preferences WHERE user_id = ?';
        const results = await query(sql, [id]);
        return results[0] || null;
    },

    setPreferences: async (id, data) => {
        const { preferred_fuel, budget_limit } = data;
        const sql = `
            INSERT INTO user_preferences (user_id, preferred_fuel, budget_limit) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE preferred_fuel = VALUES(preferred_fuel), budget_limit = VALUES(budget_limit)
        `;
        return query(sql, [id, preferred_fuel || null, budget_limit || null]);
    }
};

module.exports = User;
