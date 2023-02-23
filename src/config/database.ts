import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    database: PGDATABASE,
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: true
});

export default pool;