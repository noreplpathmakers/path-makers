const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const checkServices = async () => {
    try {
        const res = await pool.query('SELECT * FROM services');
        console.log('Services in DB:', res.rows);
    } catch (err) {
        console.error('Error querying services:', err);
    } finally {
        pool.end();
    }
};

checkServices();
