const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const checkConstraints = async () => {
    try {
        const res = await pool.query(`
            SELECT conname, pg_get_constraintdef(c.oid)
            FROM pg_constraint c
            JOIN pg_namespace n ON n.oid = c.connamespace
            WHERE conrelid = 'requests'::regclass
        `);
        console.log('Constraints on requests table:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

checkConstraints();
