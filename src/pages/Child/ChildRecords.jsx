import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Table from '../../components/Table';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChildRecord = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [childrenData, setChildrenData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [childToDelete, setChildToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChildrenData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/children`);
                setChildrenData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching children data:', error);
                setLoading(false);
            }
        };

        fetchChildrenData();
    }, []);

    const columns = [
        { key: 'children_name', header: 'Nama' },
        { key: 'children_birth_date', header: 'Tanggal Lahir' },
        { key: 'children_address', header: 'Alamat' },
        { key: 'children_weight', header: 'Berat (kg)' },
        { key: 'children_height', header: 'Tinggi (cm)' },
        { key: 'children_parent', header: 'Orang Tua' },
        { key: 'children_parent_phone', header: 'Telepon' },
        { key: 'children_blood_type', header: 'Gol. Darah' },
        { key: 'children_allergy', header: 'Alergi' },
        { key: 'actions', header: 'Aksi' },
    ];

    const filteredData = childrenData.filter((child) =>
        Object.values(child).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleAddChild = () => {
        navigate('/pendaftaran-anak');
    };

    const handleUpdate = (childId) => {
        navigate(`/ubah-data-anak/${childId}`);
    };

    const confirmDeleteChild = (childId) => {
        setChildToDelete(childId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/children/${childToDelete}`);
            setChildrenData((prevData) =>
                prevData.filter((child) => child.children_id !== childToDelete)
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting child data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-teal-800">Data Anak</h1>
                    <button
                        onClick={handleAddChild}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <FaPlus className="mr-2" />
                        Tambah Anak
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md py-2 px-4 w-full sm:w-1/3"
                            placeholder="Cari anak..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="text-gray-400 ml-2 h-6 w-6" />
                    </div>

                    <Table
                        columns={columns}
                        data={filteredData.map((child) => ({
                            ...child,
                            actions: (
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleUpdate(child.children_id)}
                                        className="text-teal-600 hover:text-teal-900 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteChild(child.children_id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ),
                        }))}
                    />
                </div>
            </main>

            <Footer />

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Konfirmasi Hapus"
                message="Apakah Anda yakin ingin menghapus data anak ini?"
                confirmText="Hapus"
                cancelText="Batal"
            />
        </div>
    );
};

export default ChildRecord;