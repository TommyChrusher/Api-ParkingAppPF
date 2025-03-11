import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const Pool = new pg.Pool({
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})