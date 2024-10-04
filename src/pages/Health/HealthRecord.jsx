import React, { useMemo, useState, useEffect } from 'react';
import { FaSearch, FaFilePdf, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Table from '../../components/Table';
import generateReportPDF from '../../utils/generatePDF';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationControls from '../../components/PaginationControls';
import NotificationModal from '../../components/NotificationModal';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function HealthRecords() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [groupCurrentPage, setGroupCurrentPage] = useState(1);
    const [individualCurrentPage, setIndividualCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [childrenData, setChildrenData] = useState([]);
    const navigate = useNavigate();
    const itemsPerPage = 5;

    useEffect(() => {
        fetchChildrenData();
    }, []);

    useEffect(() => {
        if (error) {
            setIsErrorModalOpen(true);
        }
    }, [error]);

    const fetchChildrenData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/children`);
            setChildrenData(response.data.data);
            setError(null);
        } catch (err) {
            setError('Gagal mengambil data dari server, coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleErrorModalClose = () => {
        setIsErrorModalOpen(false);
        setError(null);
    };

    const columns = [
        { key: 'record_date', header: 'Tanggal' },
        { key: 'record_immunization', header: 'Imunisasi' },
        { key: 'record_vaccinated_by', header: 'Pemberi Vaksin' },
        {
            key: 'actions',
            header: 'Aksi',
            render: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditRecord(row.record_id, selectedChild);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setRecordToDelete(row.record_id);
                            setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Hapus"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = useMemo(() => {
        return childrenData.filter((child) =>
            child.children_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [childrenData, searchTerm]);

    const groupedData = useMemo(() => {
        return filteredData.reduce((acc, child) => {
            acc[child.children_id] = {
                children_id: child.children_id,
                name: child.children_name,
                birthDate: child.children_birth_date,
                records: child.health_records || [],
            };
            return acc;
        }, {});
    }, [filteredData]);

    const totalGroupPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);
    
    const currentGroupData = useMemo(() => {
        const startIndex = (groupCurrentPage - 1) * itemsPerPage;
        return Object.entries(groupedData).slice(startIndex, startIndex + itemsPerPage);
    }, [groupedData, groupCurrentPage]);

    const totalIndividualPages = selectedChild && groupedData[selectedChild]
        ? Math.ceil(groupedData[selectedChild].records.length / itemsPerPage)
        : 0;
    
    const currentIndividualData = useMemo(() => {
        if (!selectedChild || !groupedData[selectedChild]) return [];
        const records = groupedData[selectedChild].records;
        const startIndex = (individualCurrentPage - 1) * itemsPerPage;
        return records.slice(startIndex, startIndex + itemsPerPage);
    }, [groupedData, selectedChild, individualCurrentPage]);

    const handleChildClick = (childrenId) => {
        setSelectedChild(childrenId);
        setIndividualCurrentPage(1);
    };

    const handleAddRecord = (childrenId) => {
        navigate(`/pencatatan-riwayat-kesehatan/${childrenId}`);
    };

    const handleEditRecord = (recordId, childrenId) => {
        navigate(`/pencatatan-riwayat-kesehatan/${recordId}/${childrenId}`);
    };

    const handleDeleteRecord = async (childrenId, recordId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/health-records/${recordId}/children/${childrenId}`);
            fetchChildrenData();
            setIsDeleteModalOpen(false);
            setRecordToDelete(null);
        } catch (err) {
            setError('Gagal menghapus rekam kesehatan. Silakan coba lagi.');
        }
    };

    const handleDownloadPDF = () => {
        if (selectedChild && groupedData[selectedChild]) {
            const childData = groupedData[selectedChild];
            const title = `Laporan Rekam Kesehatan ${childData.name}`;
            const date = new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
    
            // Define PDF columns - exclude actions and add numbering
            const pdfColumns = [
                { header: 'No.', key: 'number' },
                { header: 'Tanggal', key: 'record_date' },
                { header: 'Imunisasi', key: 'record_immunization' },
                { header: 'Pemberi Vaksin', key: 'record_vaccinated_by' }
            ];
    
            const pdfData = childData.records.map((record, index) => ({
                ...record,
                number: index + 1
            }));
    
            const body = `
                Nama Anak: ${childData.name}
                Tanggal Lahir: ${childData.birthDate}
                Jumlah Rekam Kesehatan: ${childData.records.length}
    
                Berikut adalah data rekam kesehatan untuk ${childData.name}:
            `;
    
            generateReportPDF(title, date, pdfColumns, pdfData, body);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar />
            <NotificationModal
                isOpen={isErrorModalOpen}
                onClose={handleErrorModalClose}
                message={error}
                title="Error"
                duration={5000}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setRecordToDelete(null);
                }}
                message="Apakah Anda yakin ingin menghapus rekam kesehatan ini?"
                title="Konfirmasi Hapus"
                duration={0}
                onConfirm={() => handleDeleteRecord(selectedChild, recordToDelete)}
            />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-teal-800">Rekam Kesehatan</h1>
                </div>

                <div className="mb-4 flex">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Cari nama anak..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-64 sm:text-sm border-gray-300 rounded-l-md h-10 px-3"
                        />
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 h-10">
                            <FaSearch className="h-4 w-4 mr-2" />
                            Cari
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {currentGroupData.map(([childrenId, child]) => (
                        <div
                            key={childrenId}
                            className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                                selectedChild === childrenId ? 'ring-2 ring-teal-500 bg-teal-50' : 'hover:bg-teal-50'
                            }`}
                            onClick={() => handleChildClick(childrenId)}
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                            <p className="text-sm text-gray-500">Tanggal Lahir: {child.birthDate}</p>
                            <p className="mt-2 text-sm text-gray-600">{child.records.length} rekam kesehatan</p>
                        </div>
                    ))}
                </div>

                {totalGroupPages > 1 && (
                    <div className="mt-4">
                        <PaginationControls
                            currentPage={groupCurrentPage}
                            totalPages={totalGroupPages}
                            onPageChange={setGroupCurrentPage}
                        />
                    </div>
                )}

                {selectedChild && groupedData[selectedChild] && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-teal-800">
                                Rekam Kesehatan: {groupedData[selectedChild].name}
                            </h2>
                            <div className="flex space-x-2">
                                {groupedData[selectedChild].records.length > 0 && (
                                    <button
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        onClick={handleDownloadPDF}
                                    >
                                        <FaFilePdf className="mr-1" />
                                        Download PDF
                                    </button>
                                )}
                                <button
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    onClick={() => handleAddRecord(selectedChild)}
                                >
                                    <FaPlus className="mr-1" />
                                    Tambah Rekam Kesehatan
                                </button>
                            </div>
                        </div>

                        {groupedData[selectedChild].records.length === 0 ? (
                            <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md">
                                Tidak ada rekam kesehatan yang tersedia untuk anak ini.
                            </div>
                        ) : (
                            <>
                                <Table data={currentIndividualData} columns={columns} />
                                {totalIndividualPages > 1 && (
                                    <PaginationControls
                                        currentPage={individualCurrentPage}
                                        totalPages={totalIndividualPages}
                                        onPageChange={setIndividualCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </div>
                )}

                {!selectedChild && (
                    <div className="mt-6 text-center text-gray-500">
                        Silakan pilih anak untuk melihat rekam kesehatan.
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}