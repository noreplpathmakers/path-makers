import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateReceipt = (data) => {
    const doc = new jsPDF();
    const { unique_id, client, service_code, message } = data;

    // Border
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.rect(5, 5, 200, 287); // A4 Border

    // Header Background
    doc.setFillColor(63, 81, 181); // Indigo color
    doc.rect(5, 5, 200, 40, 'F');

    // Branding
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("PathMakers", 15, 20);
    doc.setFontSize(10);
    doc.text("Innovative Digital Solutions", 15, 30);

    // Freelancing Badge (Right Corner)
    doc.setFillColor(255, 165, 0); // Orange
    doc.roundedRect(160, 15, 35, 8, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("FREELANCING", 165, 20);
    doc.setFont("helvetica", "normal"); // Reset font

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 130, 35);

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("Service Receipt", 15, 60);

    doc.setTextColor(63, 81, 181);
    doc.setFontSize(12);
    doc.text(`Tracking ID: ${unique_id}`, 140, 60);

    // Helper: Map Code to Name
    const getServiceName = (code) => {
        const map = {
            'WEB': 'Web Development',
            'APP': 'App Development',
            'AI': 'AI Solutions',
            'ACAD': 'Academic Assistance',
            'CLD': 'Cloud Infrastructure',
            'SEC': 'Cyber Security'
        };
        return map[code] || code;
    };

    // Helper for empty fields
    const val = (v) => (v && v.trim() !== "") ? v : 'Not Entered';

    // Client Details Table
    autoTable(doc, {
        startY: 70,
        head: [['Field', 'Details']],
        body: [
            ['Service Category', getServiceName(service_code)],
            ['Full Name', val(client.name)],
            ['Phone Number', val(client.phone)],
            ['Email Address', val(client.email)],
            ['Address', (client.address_city || client.address_state) ? `${val(client.address_door)}, ${val(client.address_city)}, ${val(client.address_district)}, ${val(client.address_state)} - ${val(client.address_pincode)}` : 'Not Entered'],
            ['Organization', val(client.org_name)],
            ['Project Description', val(message)],
            ['Expected Date of Completion', val(data.expected_date)]
        ],
        theme: 'grid',
        headStyles: { fillColor: [63, 81, 181] },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
    });

    let finalY = doc.lastAutoTable.finalY + 15;

    // Payment Section
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details:", 15, finalY);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);
    doc.text("Status: No payment done", 15, finalY + 7);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("* Price details will be fixed after discussing the project details directly.", 15, finalY + 14);

    finalY += 30;

    // Disclaimers
    const disclaimerText = "* The date can vary. Accurate date will be fixed after the confirmation of request by the PathMakers team.";
    doc.setTextColor(255, 0, 0); // Red color
    doc.text(disclaimerText, 15, finalY);

    doc.setTextColor(100, 100, 100); // Reset color
    doc.text("This is a computer generated receipt. Our team will contact you shortly.", 15, finalY + 7);

    // Contact
    finalY += 20;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Contact Us:", 15, finalY);
    doc.text("+91 7200 75 4566 | noreply.pathmakers@gmail.com", 15, finalY + 5);

    // Thank You Footer
    doc.setFontSize(12);
    doc.setTextColor(63, 81, 181);
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for contacting PathMakers team", 105, 280, { align: 'center' });

    doc.save(`Receipt_${unique_id}.pdf`);
};
