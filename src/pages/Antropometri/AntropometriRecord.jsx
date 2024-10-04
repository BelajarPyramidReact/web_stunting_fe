import React, { useMemo, useState, useEffect } from 'react';
import { FaSearch, FaFilePdf, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Table from '../../components/Table';
import generateReportPDF from '../../utils/generatePDF';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationControls from '../../components/PaginationControls';
import NotificationModal from '../../components/NotificationModal';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function AnthropometryMeasurementsRecord() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [groupCurrentPage, setGroupCurrentPage] = useState(1);
    const [individualCurrentPage, setIndividualCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [measurementToDelete, setMeasurementToDelete] = useState(null);
    const [childrenData, setChildrenData] = useState([]);
    const navigate = useNavigate();
    const groupItemsPerPage = 5;
    const individualItemsPerPage = 5;

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
            setError('Gagal mengambil data ke server, coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleErrorModalClose = () => {
        setIsErrorModalOpen(false);
        setError(null);
    };

    // Columns for the table
    const columns = [
        { key: 'measurement_date', header: 'Tanggal Pengukuran' },
        { key: 'measurement_weight', header: 'Berat (kg)' },
        { key: 'measurement_height', header: 'Tinggi (cm)' },
        { key: 'measurement_head_circumference', header: 'Lingkar Kepala (cm)' },
        { key: 'measurement_arm_circumference', header: 'Lingkar Lengan (cm)' },
        { key: 'measurement_abdominal_circumference', header: 'Lingkar Perut (cm)' },
        { key: 'measurement_leg_circumference', header: 'Lingkar Kaki (cm)' },
        {
            key: 'actions',
            header: 'Aksi',
            render: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditMeasurements(row.measurement_id, selectedChild);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMeasurementToDelete(row.measurement_id);
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
                measurements: child.measurements || [],
            };
            return acc;
        }, {});
    }, [filteredData]);

    // Pagination for group data (list of children)
    const totalGroupPages = Math.ceil(Object.keys(groupedData).length / groupItemsPerPage);
    const currentGroupData = useMemo(() => {
        const startIndex = (groupCurrentPage - 1) * groupItemsPerPage;
        return Object.entries(groupedData).slice(startIndex, startIndex + groupItemsPerPage);
    }, [groupedData, groupCurrentPage]);

    // Pagination for individual data (measurements of selected child)
    const totalIndividualPages = selectedChild && groupedData[selectedChild]
        ? Math.ceil(groupedData[selectedChild].measurements.length / individualItemsPerPage)
        : 0;
    const currentIndividualData = useMemo(() => {
        if (!selectedChild || !groupedData[selectedChild]) return [];
        const measurements = groupedData[selectedChild].measurements;
        const startIndex = (individualCurrentPage - 1) * individualItemsPerPage;
        return measurements.slice(startIndex, startIndex + individualItemsPerPage);
    }, [groupedData, selectedChild, individualCurrentPage]);

    // Prepare data for Recharts graph
    const graphData = useMemo(() => {
        if (selectedChild && groupedData[selectedChild]) {
            return groupedData[selectedChild].measurements.map(m => ({
                date: m.measurement_date,
                weight: m.measurement_weight,
                height: m.measurement_height,
                headCircumference: m.measurement_head_circumference,
                abdominal_circumference: m.measurement_abdominal_circumference,
                legCircumference: m.measurement_leg_circumference,
                armCircumference: m.measurement_arm_circumference,
            }));
        }
        return [];
    }, [groupedData, selectedChild]);

    const handleChildClick = (childrenId) => {
        setSelectedChild(childrenId);
        setIndividualCurrentPage(1);
    };
    const handleAddMeasurements = (childrenId) => {
        navigate(`/pengukuran-antropometri/${childrenId}`)
    }

    const handleEditMeasurements = (measurement_id, childrenId) => {
        navigate(`/pengukuran-antropometri/${measurement_id}/${childrenId}`)
    }

    const handleDeleteMeasurement = async (child_id, measurementId) => {
        console.log(child_id, measurementId);

        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/measurements/${measurementId}/children/${child_id}`);
            fetchChildrenData();
            setIsDeleteModalOpen(false);
            setMeasurementToDelete(null);
        } catch (err) {
            setError('Gagal menghapus data pengukuran. Silakan coba lagi.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    const handleDownloadPDF = () => {
        if (selectedChild && groupedData[selectedChild]) {
            const childData = groupedData[selectedChild];
            const title = `Laporan Pertumbuhan ${childData.name}`;
            const date = new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Updated columns for PDF - excluding actions column and adding number column
            const pdfColumns = [
                { header: 'No.', key: 'number' },
                { header: 'Tanggal Pengukuran', key: 'measurement_date' },
                { header: 'Berat (kg)', key: 'measurement_weight' },
                { header: 'Tinggi (cm)', key: 'measurement_height' },
                { header: 'Lingkar Kepala (cm)', key: 'measurement_head_circumference' },
                { header: 'Lingkar Lengan (cm)', key: 'measurement_arm_circumference' },
                { header: 'Lingkar Perut (cm)', key: 'measurement_abdominal_circumference' },
                { header: 'Lingkar Kaki (cm)', key: 'measurement_leg_circumference' }
            ];

            const pdfData = childData.measurements.map((measurement, index) => ({
                ...measurement,
                number: index + 1
            }));

            const body = `
                Nama Anak: ${childData.name}
                Tanggal Lahir: ${childData.birthDate}
                Jumlah Pengukuran: ${childData.measurements.length}
    
                Berikut adalah data pengukuran antropometri untuk ${childData.name}:
            `;

            generateReportPDF(title, date, pdfColumns, pdfData, body);
        }
    };


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
                    setMeasurementToDelete(null);
                }}
                message="Apakah Anda yakin ingin menghapus data pengukuran ini?"
                title="Konfirmasi Hapus"
                duration={0}
                onConfirm={() => {
                    handleDeleteMeasurement(selectedChild, measurementToDelete);
                }}
            />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-teal-800">
                        Pengukuran Antropometri
                    </h1>

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

                {selectedChild && groupedData[selectedChild]?.measurements.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold text-teal-800 mb-4">
                            Grafik Perkembangan: {groupedData[selectedChild]?.name}
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Berat" />
                                <Line type="monotone" dataKey="height" stroke="#82ca9d" name="Tinggi" />
                                <Line type="monotone" dataKey="headCircumference" stroke="#ffc658" name="Lingkar Kepala" />
                                <Line type="monotone" dataKey="armCircumference" stroke="#ff9300" name="Lingkar Lengan" />
                                <Line type="monotone" dataKey="abdominal_circumference" stroke="#ff1300" name="Lingkar Perut" />
                                <Line type="monotone" dataKey="legCircumference" stroke="#ff5300" name="Lingkar Kaki" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {currentGroupData.map(([childrenId, child]) => (
                        <div
                            key={childrenId}
                            className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${selectedChild === childrenId ? 'ring-2 ring-teal-500 bg-teal-50' : 'hover:bg-teal-50'
                                }`}
                            onClick={() => handleChildClick(childrenId)}
                        >
                            <h3 className="text-lg font-semibold text-teal-700 mb-2">{child.name}</h3>
                            <p className="text-sm text-gray-600">Tanggal Lahir: {child.birthDate}</p>
                            <p className="text-sm text-gray-600">Pengukuran: {child.measurements.length} kali</p>
                        </div>
                    ))}
                </div>

                {totalGroupPages > 1 && (
                    <PaginationControls
                        currentPage={groupCurrentPage}
                        totalPages={totalGroupPages}
                        onPageChange={setGroupCurrentPage}
                    />
                )}

                {selectedChild && groupedData[selectedChild] && (
                    <div className="mt-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
                            <h2 className="text-xl font-bold text-teal-800">
                                Data Pengukuran: {groupedData[selectedChild].name}
                            </h2>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                {groupedData[selectedChild]?.measurements.length > 0 &&
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <FaFilePdf className="mr-2" />
                                        Unduh PDF
                                    </button>
                                }
                                <button
                                    onClick={() => handleAddMeasurements(groupedData[selectedChild].children_id)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    <FaPlus className="mr-2" />
                                    Tambah Pengukuran
                                </button>

                            </div>
                        </div>

                        {groupedData[selectedChild]?.measurements.length === 0 ? (
                            <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md">
                                Belum ada data pengukuran yang tersedia untuk anak ini.
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
            </main>

            <Footer />
        </div>
    );
}