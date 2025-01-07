// const pool = require('../config/db_connection.js');
import db from "../config/db_connection.js";

const User = {
    getById: async (id) => {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },
    getByEmail: async (email) => {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    },
    searchUsersByEmail: async (emailPattern, projectId) => {
        const result = await db.query(
            `SELECT email
             FROM users u
             WHERE u.email ILIKE $1
               AND NOT EXISTS (
                 SELECT 1
                 FROM user_projects up
                 WHERE up.user_id = u.id
               AND up.project_id = $2
                 )
             ORDER BY u.email ASC
                 LIMIT 5`,
            [`%${emailPattern}%`, projectId]
        );
        return result.rows;
    },
    save: async (data) => {
        const result = await db.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [data.username, data.password, data.email]);
        return result.rows[0];
    },
    saveRefreshToken: async (token) => {
        const result = await db.query("INSERT INTO refresh_tokens (token) VALUES ($1)", [token]);
        return result.rows[0];
    },
    getRefreshToken: async (token) => {
        const result = await db.query("SELECT * FROM refresh_tokens WHERE token = $1", [token]);
        return result.rows[0];
    },
    deleteRefreshToken: async (token) => {
        const result = await db.query("DELETE FROM refresh_tokens WHERE token = $1 RETURNING *", [token]);
        return result.rows[0];
    }
}

export default User;
