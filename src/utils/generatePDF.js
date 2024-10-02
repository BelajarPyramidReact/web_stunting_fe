import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png';

const generateReportPDF = (title, date, columns, filteredData, body) => {
    const doc = new jsPDF();

    doc.addImage(logo, 'PNG', 15, 10, 30, 30);

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("PEMERINTAH KABUPATEN LAMPUNG", 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text("DINAS KESEHATAN", 105, 27, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Jl. Kesehatan No. 123, Kota Contoh, Provinsi Contoh 12345", 105, 34, { align: 'center' });
    doc.text("Telepon: (021) 1234567, Faksimili: (021) 7654321", 105, 39, { align: 'center' });
    doc.text("Laman: www.dinkes-contoh.go.id, Surel: dinkes@contoh.go.id", 105, 44, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(15, 50, 195, 50);

    // Letter details
    doc.setFontSize(11);
    doc.text(`Nomor     : 440/${doc.internal.getNumberOfPages()}/Dinkes/${new Date().getFullYear()}`, 15, 60);
    doc.text(`Lampiran  : 1 (satu) berkas`, 15, 66);
    doc.text(`Perihal   : ${title}`, 15, 72);
    doc.text(`${date}`, 150, 60);

    // Content
    doc.setFontSize(11);
    let yPos = 85; // Start content after header
    const content = body;

    content.split('\n').forEach(paragraph => {
        doc.text(paragraph, -2, yPos);
        yPos += paragraph === '' ? 5 : 10; // Adjust yPos for each paragraph
    });

    // Table with dynamic pagination and footer
    doc.autoTable({
        head: [columns.map(col => col.header)],
        body: filteredData.map(row =>
            columns.map(col => (col.render ? col.render(row) : row[col.key]))
        ),
        startY: yPos-10,
        theme: 'grid', 
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        margin: { top: 65, left: 15, right: 15 }, // Adjust the top margin for tables on new pages
        didDrawPage: function (data) {
            // Add dynamic header on each page
            doc.addImage(logo, 'PNG', 15, 10, 30, 30);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("PEMERINTAH KABUPATEN LAMPUNG", 105, 20, { align: 'center' });
            doc.setFontSize(14);
            doc.text("DINAS KESEHATAN", 105, 27, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text("Jl. Kesehatan No. 123, Kota Contoh, Provinsi Contoh 12345", 105, 34, { align: 'center' });
            doc.text("Telepon: (021) 1234567, Faksimili: (021) 7654321", 105, 39, { align: 'center' });
            doc.text("Laman: www.dinkes-contoh.go.id, Surel: dinkes@contoh.go.id", 105, 44, { align: 'center' });

            // Line separator
            doc.setLineWidth(0.5);
            doc.line(15, 50, 195, 50);

            // Footer with page number
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.text(`Halaman ${data.pageNumber} dari ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
        },
    });

    // Closing statement and signature
    yPos = doc.lastAutoTable.finalY + 20; 
    doc.text('Demikian laporan ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.', 15, yPos, { maxWidth: 180, align: 'left' });

    yPos += 30;
    doc.text('Kepala Dinas Kesehatan', 140, yPos);
    doc.text('Kabupaten Contoh,', 140, yPos + 5);
    // Add signature image here if available
    doc.setFont('helvetica', 'bold');
    doc.text('dr. Nama Lengkap, M.Kes', 140, yPos + 40);
    doc.setFont('helvetica', 'normal');
    doc.text('NIP. 197001011990031001', 140, yPos + 45);

    // Save the PDF
    doc.save(`Laporan_${title}_${date.replace(/\//g, '-')}.pdf`);
};

export default generateReportPDF;