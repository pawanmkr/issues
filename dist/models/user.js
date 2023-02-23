import chalk from 'chalk';
import pool from '../config/database.js';
import handleError from '../utils/handleError.js';
async function create_user_table() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_table (
                id SERIAL PRIMARY KEY,
                first_name varchar(16) NOT NULL,
                last_name varchar(32) NOT NULL,
                username varchar(32) NOT NULL UNIQUE,
                email varchar(64) NOT NULL,
                password_hash varchar(64) NOT NULL,
                joined_on DATE DEFAULT CURRENT_DATE
            );
        `);
        console.log(chalk.bgWhite.black("user_table created"));
    }
    catch (err) {
        handleError(err, "Failed creating User table");
    }
}
const add_user = async (first_name, last_name, username, email, password_hash) => {
    console.log(5);
    try {
        const user = await pool.query(`
            INSERT INTO user_table (first_name, last_name, username, email, password_hash) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `, [first_name, last_name, username, email, password_hash]);
        console.log(5.5);
        return user;
    }
    catch (error) {
        handleError(error, "can't add user to db");
    }
    ;
};
const find_user_hash = async (username) => {
    try {
        if (!username) {
            throw new Error('Username is required');
        }
        const hash = await pool.query(`
            SELECT password_hash FROM user_table WHERE username=$1;
            `, [username]);
        return hash.rows[0].password_hash;
    }
    catch (error) {
        handleError(error, "failed fetching user's password hash");
    }
};
export { create_user_table, add_user, find_user_hash };
//# sourceMappingURL=user.js.map