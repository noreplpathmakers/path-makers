const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const corrections = [
    { name: 'Web Development', code: 'WEB' },
    { name: 'App Development', code: 'APP' },
    { name: 'AI Solutions', code: 'AI' },
    { name: 'Academic Assistance', code: 'ACAD' },
    { name: 'Cloud Infrastructure', code: 'CLD' },
    { name: 'Cyber Security', code: 'SEC' }
];

const fixCodes = async () => {
    try {
        for (const item of corrections) {
            await pool.query('UPDATE services SET code = $1 WHERE name = $2', [item.code, item.name]);
            console.log(`Updated ${item.name} -> ${item.code}`);
        }
    } catch (err) {
        console.error('Error fixing codes:', err);
    } finally {
        pool.end();
    }
};

fixCodes();
