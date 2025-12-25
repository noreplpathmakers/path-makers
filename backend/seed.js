const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const seed = async () => {
    try {
        console.log('Seeding database...');

        // 1. Seed Services
        const services = [
            { name: 'Web Development', code: 'WEBD', desc: 'Custom websites', seq: 27 },
            { name: 'App Development', code: 'APPD', desc: 'Mobile apps', seq: 4 },
            { name: 'AI Solutions', code: 'AIOL', desc: 'AI/ML models', seq: 1 },
            { name: 'Academic Assistance', code: 'ACAD', desc: 'Research support', seq: 1 }
        ];

        for (const s of services) {
            await pool.query(
                `INSERT INTO services (name, code, description, starting_number_sequence) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (code) DO NOTHING`,
                [s.name, s.code, s.desc, s.seq]
            );
        }
        console.log('Services seeded.');

        // 2. Seed Admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@pathmakers.tech';
        const adminPass = process.env.ADMIN_PASSWORD || 'changeme_in_env';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(adminPass, salt);

        await pool.query(
            `INSERT INTO employees (name, email, password_hash, role, skills) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (email) DO NOTHING`,
            ['Super Admin', adminEmail, hash, 'admin', 'Management,Full Access']
        );
        console.log(`Admin seeded. Email: ${adminEmail}, Password: ${adminPass}`);

        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seed();
