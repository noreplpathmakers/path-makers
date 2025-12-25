const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkClients() {
    try {
        const res = await pool.query('SELECT COUNT(*) FROM clients');
        console.log(`Total Clients in DB: ${res.rows[0].count}`);
        if (res.rows[0].count > 0) {
            const sample = await pool.query('SELECT id, name FROM clients LIMIT 3');
            console.log('Sample Clients:', sample.rows);
        }
    } catch (err) {
        console.error("DB Error:", err);
    } finally {
        pool.end();
    }
}

checkClients();
