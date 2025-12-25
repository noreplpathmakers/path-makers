const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const services = [
    { name: 'Web Development', code: 'WEB' },
    { name: 'App Development', code: 'APP' },
    { name: 'AI Solutions', code: 'AI' },
    { name: 'Academic Assistance', code: 'ACA' },
    { name: 'Cloud Infrastructure', code: 'CLD' },
    { name: 'Cyber Security', code: 'SEC' }
];

const seedServices = async () => {
    try {
        for (const service of services) {
            // Check if exists
            const res = await pool.query('SELECT * FROM services WHERE code = $1', [service.code]);
            if (res.rows.length === 0) {
                await pool.query('INSERT INTO services (name, code, description) VALUES ($1, $2, $3)', [service.name, service.code, service.name]);
                console.log(`Inserted service: ${service.name}`);
            } else {
                console.log(`Service already exists: ${service.name}`);
            }
        }
    } catch (err) {
        console.error('Error seeding services:', err);
    } finally {
        pool.end();
    }
};

seedServices();
