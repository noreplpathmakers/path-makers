const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const checkSchema = async () => {
    try {
        const requests = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'requests';
        `);
        console.log('Requests Table:', requests.rows);

        const users = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `);
        console.log('Users Table:', users.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

checkSchema();
