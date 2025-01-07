import dotenv from 'dotenv';
import pkg from 'pg';

const {Pool} = pkg;

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

let db;

try {
    db = await pool.connect(); // Establish the connection
    console.log('Connected to the database');
} catch (error) {
    console.log({error, text: 'Connection Error'});
}


export default db;