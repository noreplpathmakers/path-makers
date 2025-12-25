const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const services = [
    { name: 'Web Development', code: 'WEB' },
    { name: 'App Development', code: 'APP' },
    { name: 'AI Solutions', code: 'AI' },
    { name: 'Academic Assistance', code: 'ACAD' }, // Matches existing DB
    { name: 'Cloud Infrastructure', code: 'CLD' },
    { name: 'Cyber Security', code: 'SEC' }
];

const seedServices = async () => {
    try {
        for (const service of services) {
            // Check if exists by name (since name is unique)
            const res = await pool.query('SELECT * FROM services WHERE name = $1', [service.name]);
            if (res.rows.length === 0) {
                await pool.query('INSERT INTO services (name, code, description) VALUES ($1, $2, $3)', [service.name, service.code, service.name]);
                console.log(`Inserted service: ${service.name}`);
            } else {
                console.log(`Service already exists: ${service.name} (Code: ${res.rows[0].code})`);
                // Update code if different (fix legacy data)
                if (res.rows[0].code !== service.code) {
                    await pool.query('UPDATE services SET code = $1 WHERE id = $2', [service.code, res.rows[0].id]);
                    console.log(`Updated code for ${service.name} to ${service.code}`);
                }
            }
        }
    } catch (err) {
        console.error('Error seeding services:', err);
    } finally {
        pool.end();
    }
};

seedServices();
