const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const checkColumns = async () => {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'requests';
        `);
        console.log('Columns in requests table:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

checkColumns();
