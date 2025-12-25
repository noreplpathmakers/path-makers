const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

exports.createRequest = async (req, res) => {
    // Expect multipart/form-data
    const {
        name, email, phone, org_name,
        address_door, address_city, address_district, address_state, address_pincode,
        service_code, description, expected_date
    } = req.body;

    console.log('Received Booking Request:', req.body); // Debugging

    if (!name || !phone) {
        return res.status(400).json({ msg: 'Name and Phone are required.' });
    }

    const attachmentPath = req.file ? req.file.path : null;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Get Service Info
        const serviceRes = await client.query('SELECT id, code, starting_number_sequence FROM services WHERE code = $1', [service_code]);
        if (serviceRes.rows.length === 0) {
            throw new Error(`Invalid Service Code: ${service_code}`);
        }
        const service = serviceRes.rows[0];

        // 2. Client Management (Upsert based on Email OR Phone)
        let clientQuery = 'SELECT id FROM clients WHERE email = $1';
        let clientValues = [email];
        // If email is empty, search by phone
        if (!email && phone) {
            clientQuery = 'SELECT id FROM clients WHERE phone = $1';
            clientValues = [phone];
        } else if (email && phone) {
            // If both provided, maybe prefer email or try both. 
            // Logic: Check email first.
        }

        let clientRes = await client.query(clientQuery, clientValues);
        let clientId;

        if (clientRes.rows.length > 0) {
            clientId = clientRes.rows[0].id;
            // Update client details
            await client.query(
                `UPDATE clients SET 
                    name = $1, phone = $2, organization_name = $3, 
                    address_door = $4, address_city = $5, address_district = $6, address_state = $7, address_pincode = $8 
                WHERE id = $9`,
                [name, phone, org_name, address_door, address_city, address_district, address_state, address_pincode, clientId]
            );
        } else {
            // Create new client
            // Handle optional email being empty string -> null to avoid unique constraint if any (though unique is usually on valid email)
            const cleanEmail = email === '' ? null : email;

            const newClient = await client.query(
                `INSERT INTO clients (name, email, phone, organization_name, address_door, address_city, address_district, address_state, address_pincode) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
                [name, cleanEmail, phone, org_name, address_door, address_city, address_district, address_state, address_pincode]
            );
            clientId = newClient.rows[0].id;
        }

        // 3. Generate Unique ID
        // Logic: SERVICE_CODE + (Sequence + 1000)
        // We should really update the sequence in DB.
        const currentSeq = service.starting_number_sequence || 0;
        const newSeq = currentSeq + 1;

        const uniqueId = `${service.code}${String(newSeq + 1000)}`;

        // 4. Create Request
        // 4. Create Request
        const newRequest = await client.query(
            `INSERT INTO requests (unique_id, client_id, service_id, message, attachment_path, status, expected_completion_date) 
            VALUES ($1, $2, $3, $4, $5, 'Pending', $6) RETURNING *`,
            [uniqueId, clientId, service.id, description, attachmentPath, expected_date || null]
        );

        // 5. Update Service Sequence
        await client.query('UPDATE services SET starting_number_sequence = $1 WHERE id = $2', [newSeq, service.id]);

        await client.query('COMMIT');

        // Return details needed for Receipt
        res.json({
            msg: 'Request submitted successfully',
            unique_id: uniqueId,
            request: newRequest.rows[0],
            client: { name, email, phone, org_name, address_door, address_city, address_district, address_state, address_pincode },
            service_code: service.code,
            message: description,
            expected_date: expected_date
        });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    } finally {
        client.release();
    }
};

exports.trackRequest = async (req, res) => {
    const { query } = req.query; // ?query=WEBD1001 or Phone

    if (!query) {
        return res.status(400).json({ msg: 'Query parameter is required' });
    }

    try {
        const result = await pool.query(`
            SELECT r.unique_id, r.status, r.submission_date, r.message, 
                   s.name as service_name, c.name as client_name
            FROM requests r
            JOIN services s ON r.service_id = s.id
            JOIN clients c ON r.client_id = c.id
            WHERE r.unique_id = $1 OR c.phone = $1
            ORDER BY r.submission_date DESC
        `, [query]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'No request found with this ID or Phone Number.' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.createContactMessage = async (req, res) => {
    const { name, email, phone, services, subject, message } = req.body;

    if (!name || !phone || !message) {
        return res.status(400).json({ msg: 'Name, Phone, and Message are required.' });
    }

    try {
        const servicesStr = Array.isArray(services) ? JSON.stringify(services) : services;

        await pool.query(
            `INSERT INTO contact_messages (name, email, phone, services, subject, message, status)
             VALUES ($1, $2, $3, $4, $5, $6, 'New')`,
            [name, email || null, phone, servicesStr, subject, message]
        );

        res.json({ msg: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
};

